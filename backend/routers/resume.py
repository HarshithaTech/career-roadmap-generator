from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.resume import Resume
from ..models.user import User
from ..routers.auth import get_current_user
from ..agents.resume_parser import ResumeParserAgent
from ..agents.skill_scorer import SkillScoringAgent
from ..agents.roadmap_planner import RoadmapPlannerAgent
import pypdf
import io

router = APIRouter(
    prefix="/resume",
    tags=["resume"]
)

parser_agent = ResumeParserAgent()
scorer_agent = SkillScoringAgent()
roadmap_agent = RoadmapPlannerAgent()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Support for common document types
    allowed_types = [
        "application/pdf", 
        "text/plain", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type: {file.content_type}. Only PDF, DOCX, and TXT are supported."
        )

    try:
        content = await file.read()
        
        text_content = ""
        if file.content_type == "application/pdf":
            try:
                pdf_reader = pypdf.PdfReader(io.BytesIO(content))
                for page in pdf_reader.pages:
                    text_content += page.extract_text()
            except Exception as e:
                print(f"❌ PDF Extraction Error: {e}")
                text_content = "" # Fallback
        elif "wordprocessingml" in file.content_type or "msword" in file.content_type:
             # Basic support for docx - for now we'll just log and use agent fallback
             # because extracting text from docx needs extra libs like python-docx
             print(f"📂 Docx upload detected: {file.filename}. Using fallback processing.")
             text_content = "Word document upload: " + file.filename
        else:
            try:
                text_content = content.decode("utf-8")
            except UnicodeDecodeError:
                text_content = content.decode("latin-1") # Fallback for other encodings

        # 1. Parse
        parsed_data = await parser_agent.parse_resume(text_content)
        
        # 2. Score
        scored_skills = scorer_agent.calculate_scores(parsed_data)
        
        # Calculate average score for resume
        total_score = sum(s["score"] for s in scored_skills)
        avg_score = total_score / len(scored_skills) if scored_skills else 0
        
        # 3. Save to DB
        db_resume = Resume(
            user_id=current_user.id,
            file_path=file.filename,
            resume_score=avg_score
        )
        db.add(db_resume)
        db.commit()
        
        return {
            "message": "Resume processed",
            "score": avg_score,
            "skills": scored_skills,
            "parsed_summary": parsed_data.get("raw_text_summary")
        }
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"🔥 UPLOAD ERROR: {e}\n{error_trace}")
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {str(e)}")

@router.get("/roadmap")
async def get_roadmap(target_role: str = "Software Developer", current_user: User = Depends(get_current_user)):
    # Mock data for now, ideally fetch from User's parsed skills
    skills = ["Python", "SQL"]
    gaps = ["React", "System Design"]
    
    roadmap = await roadmap_agent.generate_roadmap(skills, gaps, target_role)
    return roadmap
