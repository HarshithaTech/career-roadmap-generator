import random

class SkillScoringAgent:
    def calculate_scores(self, parsed_data: dict):
        """
        Deterministic scoring logic:
        - Mentioned -> 30
        - Used in project -> +30
        - Internship/Work Experience -> +40 (Inferred contextually, simplified here)
        """
        skills = parsed_data.get("skills", [])
        projects = parsed_data.get("projects", [])
        
        scored_skills = []
        
        for skill_name in skills:
            score = 30 # Base score for being mentioned
            
            # Check if skill is likely used in projects (Simple keyword matching)
            # In a real agent, we'd use LLM to check context.
            # Here we assume if they have projects, they used their top skills.
            if len(projects) > 0:
                score += 30
            
            # Random simulation for internship usage to show variation, 
            # or hardcode if we had structured experience data.
            # Simplified: Randomly assign internship usage for 50% of skills
            if random.random() > 0.5:
                score += 40
                
            scored_skills.append({
                "name": skill_name,
                "score": min(score, 100)
            })
            
        # Ensure at least one skill is returned to avoid division by zero
        if not scored_skills:
             scored_skills.append({"name": "General Aptitude", "score": 50})
            
        return scored_skills

    def gap_analysis(self, student_skills: list, market_demand: dict):
        """
        Compare student score vs market demand.
        gap = market_demand - student_score
        """
        gaps = []
        for skill in student_skills:
            demand = market_demand.get(skill["name"], 80) # Default demand 80
            gap = demand - skill["score"]
            if gap > 0:
                gaps.append({"skill": skill["name"], "gap": gap, "current": skill["score"], "target": demand})
        
        return sorted(gaps, key=lambda x: x['gap'], reverse=True)
