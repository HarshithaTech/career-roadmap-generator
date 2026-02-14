import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

class ResumeParserAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')

    async def parse_resume(self, text_content: str):
        prompt = f"""
        You are an expert Resume Parser. Analyze the following resume text and extract structured data.
        Return the result as a valid JSON object with the following keys:
        - "skills": list of skills mentioned (e.g. ["Python", "React", "SQL"])
        - "experience_years": estimated years of experience (number)
        - "education": list of degrees (e.g. ["B.Tech Computer Science"])
        - "projects": list of project titles
        - "raw_text_summary": brief summary of the profile

        Resume Text:
        {text_content}
        """
        
        try:
            response = self.model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            return json.loads(response.text)
        except Exception as e:
            print(f"Error parsing resume: {e}")
            # MOCK FALLBACK
            print("⚠️ RESUME PARSER FALLBACK: Returning mock data")
            return {
                "skills": ["Python", "SQL", "Machine Learning", "Data Analysis", "FastAPI", "React"],
                "experience_years": 2,
                "education": ["B.Tech Computer Science"],
                "projects": ["Agentic Resume Analyzer", "E-commerce Chatbot"],
                "raw_text_summary": "Motivated software engineer with experience in Python full-stack development and AI agents."
            }
