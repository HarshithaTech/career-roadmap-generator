import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

try:
    print("Listing available models...")
    for m in genai.list_models():
        print(f"Model: {m.name}")
        print(f"Methods: {m.supported_generation_methods}")
except Exception as e:
    import traceback
    print(f"Error listing models: {e}")
    print(traceback.format_exc())
