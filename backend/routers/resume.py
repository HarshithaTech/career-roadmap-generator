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
    if file.content_type not in ["application/pdf", "text/plain"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    content = await file.read()
    
    text_content = ""
    if file.content_type == "application/pdf":
        try:
            pdf_reader = pypdf.PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                text_content += page.extract_text()
        except:
            text_content = "" # Fallback
    else:
        text_content = content.decode("utf-8")

    # 1. Parse
    parsed_data = await parser_agent.parse_resume(text_content)
    
    # 2. Score
    scored_skills = scorer_agent.calculate_scores(parsed_data)
    
    # Calculate average score for resume
    total_score = sum(s["score"] for s in scored_skills)
    avg_score = total_score / len(scored_skills) if scored_skills else 0
    
    # 3. Save to DB
    # (In a real app, save file to S3/disk. Here we just store path as dummy)
    db_resume = Resume(
        user_id=current_user.id,
        file_path=file.filename,
        resume_score=avg_score
    )
    db.add(db_resume)
    
    # Save Skills (Simplified: just returning them for now in response)
    # Ideally update StudentSkills table here
    
    db.commit()
    
    return {
        "message": "Resume processed",
        "score": avg_score,
        "skills": scored_skills,
        "parsed_summary": parsed_data.get("raw_text_summary")
    }

@router.get("/roadmap")
async def get_roadmap(target_role: str = "Software Developer", current_user: User = Depends(get_current_user)):
    # Mock data for now, ideally fetch from User's parsed skills
    skills = ["Python", "SQL"]
    gaps = ["React", "System Design"]
    
    roadmap = await roadmap_agent.generate_roadmap(skills, gaps, target_role)
    return roadmap
