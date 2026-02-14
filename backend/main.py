from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, resume, admin
from fastapi import Request
from fastapi.responses import JSONResponse

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agentic Resume Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(resume.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Agentic Resume Analyzer API"}

@app.exception_handler(Exception)
async def debug_exception_handler(request: Request, exc: Exception):
    import traceback
    error_msg = traceback.format_exc()
    with open("server_error.log", "a") as f:
        f.write(f"🔥 SERVER ERROR:\n{error_msg}\n{'-'*20}\n")
    print(f"🔥 SERVER ERROR: {error_msg}", flush=True)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)},
    )
