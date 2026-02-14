from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

# Add this to main.py to catch 500s
@app.exception_handler(Exception)
async def debug_exception_handler(request: Request, exc: Exception):
    import traceback
    error_msg = traceback.format_exc()
    print(f"🔥 SERVER ERROR: {error_msg}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)},
    )
