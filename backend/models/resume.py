from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_path = Column(String)
    resume_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="resumes")
