import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

class EventPlanningAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')

    async def plan_workshop(self, student_skills_summary: list):
        prompt = f"""
        Analyze the following student skill data and recommend a workshop to bridge the clear gaps.
        Data: {student_skills_summary}
        
        Return a JSON object for one recommended workshop:
        {{
            "title": "Workshop Title",
            "skill_focus": "Skill Name",
            "duration": "2 hours",
            "agenda": ["Item 1", "Item 2"],
            "expected_outcomes": ["Outcome 1"],
            "description": "Short marketing description"
        }}
        """
        try:
            response = self.model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            return json.loads(response.text)
        except Exception as e:
            print(f"Error planning event: {e}")
            return {}
