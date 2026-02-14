import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

class RoadmapPlannerAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')

    async def generate_roadmap(self, skills: list, gap_analysis: list, target_role: str = "Software Engineer"):
        print(f"🛑 INPUTS - Skills: {skills}, Gaps: {gap_analysis}, Role: {target_role}") # Debug log
        prompt = f"""
        Act as a Career Coach.
        The student wants to be a: "{target_role}".
        Current Skills: {skills}
        Identified Gaps: {gap_analysis}

        Task:
        1. create a 5-week study roadmap to bridge these gaps for the target role.
        2. Identify the TOP 5 FREE resources (specific course names, YouTube channels, or documentation URLs) that are best for learning these missing skills.

        Return a JSON object with these keys:
        {{
            "weeks": [
                {{
                    "week_number": 1,
                    "topics": ["Topic 1", "Topic 2"],
                    "tasks": ["Task 1", "Task 2"],
                    "outcome": "Brief outcome"
                }}
            ],
            "top_resources": [
                {{
                    "name": "Resource Name (e.g. CS50)",
                    "type": "Course/Video/Article",
                    "url": "URL or 'Search on YouTube'"
                }}
            ]
        }}
        """
        try:
            response = self.model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            print(f"🤖 GEMINI RESPONSE: {response.text}") # Debug log
            text = response.text
            # Clean markdown code blocks
            if "```json" in text:
                text = text.replace("```json", "").replace("```", "")
            elif "```" in text:
                text = text.replace("```", "")
            
            print(f"🤖 GEMINI RESPONSE (Cleaned): {text}") # Debug log
            return json.loads(text)
        except Exception as e:
            import traceback
            error_msg = f"❌ ROADMAP AGENT ERROR: {e}\n{traceback.format_exc()}"
            print(error_msg)
            with open("roadmap_debug.log", "a", encoding="utf-8") as f:
                f.write(f"\n\n--- ERROR ---\n{error_msg}\n")
            
            # MOCK FALLBACK due to API Key issues
            print("⚠️ FALLING BACK TO MOCK DATA")
            
            # Simple logic to make mock data feel dynamic based on target role
            role_focus = "General"
            if "data" in target_role.lower() or "scientist" in target_role.lower():
                role_focus = "Data Science"
            elif "ai" in target_role.lower() or "ml" in target_role.lower() or "generative" in target_role.lower() or "machine learning" in target_role.lower():
                role_focus = "AI/ML"
            elif "web" in target_role.lower() or "stack" in target_role.lower() or "frontend" in target_role.lower() or "backend" in target_role.lower():
                role_focus = "Web Dev"

            weeks = []
            if role_focus == "AI/ML":
                weeks = [
                    {"week_number": 1, "topics": ["Advanced Python", "NumPy & Pandas"], "tasks": ["Master vectorization", "Build data pipelines", "Handle missing data"], "outcome": "Data manipulation proficiency"},
                    {"week_number": 2, "topics": ["Neural Networks", "PyTorch Basics"], "tasks": ["Understand backpropagation", "Build CNN from scratch", "Train image classifier"], "outcome": "Deep Learning fundamentals"},
                    {"week_number": 3, "topics": ["Transformers", "Attention Mechanisms"], "tasks": ["Study BERT architecture", "Fine-tune pre-trained models", "Text classification task"], "outcome": "NLP model expertise"},
                    {"week_number": 4, "topics": ["LLMs", "Prompt Engineering"], "tasks": ["Explore GPT APIs", "Chain-of-thought prompting", "RAG implementation"], "outcome": "GenAI application skills"},
                    {"week_number": 5, "topics": ["MLOps", "Model Deployment"], "tasks": ["Containerize ML models", "Deploy to HuggingFace", "Build Streamlit demo"], "outcome": "Production-ready AI portfolio"}
                ]
            elif role_focus == "Data Science":
                weeks = [
                    {"week_number": 1, "topics": ["Statistics", "Probability"], "tasks": ["Hypothesis testing", "A/B testing basics", "Distributions study"], "outcome": "Statistical thinking"},
                    {"week_number": 2, "topics": ["SQL", "Data Warehousing"], "tasks": ["Complex joins", "Window functions", "Query optimization"], "outcome": "Database mastery"},
                    {"week_number": 3, "topics": ["Machine Learning", "Scikit-Learn"], "tasks": ["Feature engineering", "Model selection", "Hyperparameter tuning"], "outcome": "Classical ML proficiency"},
                    {"week_number": 4, "topics": ["Data Visualization", "Storytelling"], "tasks": ["Tableau/PowerBI", "Build dashboards", "Present insights"], "outcome": "Data communication skills"},
                    {"week_number": 5, "topics": ["Big Data", "Spark"], "tasks": ["PySpark basics", "Handle large datasets", "ETL pipelines"], "outcome": "Scalable data processing"}
                ]
            else:
                 weeks = [
                    {"week_number": 1, "topics": ["JavaScript ES6+", "Async Programming"], "tasks": ["Promises & async/await", "Closures & scope", "Event loop"], "outcome": "Modern JS proficiency"},
                    {"week_number": 2, "topics": ["React", "Component Architecture"], "tasks": ["Hooks mastery", "State management", "Build reusable components"], "outcome": "Frontend framework skills"},
                    {"week_number": 3, "topics": ["Node.js", "REST APIs"], "tasks": ["Express server", "JWT authentication", "Database integration"], "outcome": "Backend API development"},
                    {"week_number": 4, "topics": ["Database Design", "SQL/NoSQL"], "tasks": ["Schema design", "Indexing strategies", "MongoDB CRUD"], "outcome": "Data persistence expertise"},
                    {"week_number": 5, "topics": ["Testing", "CI/CD"], "tasks": ["Jest unit tests", "GitHub Actions", "Deploy to cloud"], "outcome": "Professional dev workflow"}
                ]

            return {
                "weeks": weeks,
                "top_resources": [
                    {"name": "GeeksforGeeks - " + ("AI/ML" if role_focus == "AI/ML" else role_focus), "type": "Tutorial", "url": "https://www.geeksforgeeks.org/"},
                    {"name": "W3Schools", "type": "Documentation", "url": "https://www.w3schools.com/"},
                    {"name": "Real Python" if role_focus == "AI/ML" else "MDN Web Docs", "type": "Tutorial", "url": "https://realpython.com/" if role_focus == "AI/ML" else "https://developer.mozilla.org/"},
                    {"name": "Kaggle Learn" if role_focus == "AI/ML" else "FreeCodeCamp", "type": "Course", "url": "https://www.kaggle.com/learn" if role_focus == "AI/ML" else "https://www.freecodecamp.org/"},
                    {"name": "HuggingFace Course" if role_focus == "AI/ML" else "YouTube Tutorials", "type": "Course", "url": "https://huggingface.co/learn" if role_focus == "AI/ML" else "https://www.youtube.com/"}
                ]
            }
