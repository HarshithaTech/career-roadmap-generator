from pydantic import BaseModel, EmailStr
from typing import Optional
from backend.models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    name: str
    role: UserRole = UserRole.STUDENT

class UserLogin(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    name: str
    role: UserRole

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
