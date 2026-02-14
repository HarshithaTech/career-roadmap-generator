from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models.user import User, UserRole
from ..models.resume import Resume
from ..models.skill import StudentSkill, Skill
from ..models.misc import Event
from ..routers.auth import get_current_user
from ..agents.event_planner import EventPlanningAgent

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

event_agent = EventPlanningAgent()

@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Leaderboard
    leaderboard = db.query(User).join(Resume).order_by(Resume.resume_score.desc()).limit(5).all()
    
    # Skill Analytics (Average score per skill)
    skill_stats = db.query(
        Skill.name, 
        func.avg(StudentSkill.student_score).label("avg_score")
    ).join(StudentSkill).group_by(Skill.name).all()
    
    return {
        "leaderboard": [{"name": u.name, "score": u.resumes[0].resume_score if u.resumes else 0} for u in leaderboard],
        "skill_stats": [{"skill": s[0], "average": s[1]} for s in skill_stats]
    }

@router.post("/generate-event")
async def generate_event(db: Session = Depends(get_db)):
    # Fetch all student skills to find gaps
    # aggregated_skills = ... (logic to aggregate skills)
    # For now mock data
    mock_data = ["Python: High Demand, Low Score", "React: High Demand, Low Score"]
    
    plan = await event_agent.plan_workshop(mock_data)
    
    # Save event
    if plan:
        event = Event(
            title=plan.get("title"),
            skill_focus=plan.get("skill_focus"),
            description=plan.get("description")
        )
        db.add(event)
        db.commit()
        
    return plan
