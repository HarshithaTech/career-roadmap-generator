from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    roadmap_json = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="roadmaps")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    skill_focus = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
