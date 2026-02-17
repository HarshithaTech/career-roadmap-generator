import requests
import time
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv(os.path.join('backend', '.env'))

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
BASE_URL = "http://127.0.0.1:8000"

def create_manual_token(email, expires_in_seconds):
    expire = datetime.utcnow() + timedelta(seconds=expires_in_seconds)
    to_encode = {"sub": email, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def test_token(token_label, token):
    print(f"\nTesting {token_label}...")
    try:
        response = requests.get(
            f"{BASE_URL}/auth/login", # Any protected route or even just checking if it rejects
            headers={"Authorization": f"Bearer {token}"}
        )
        # Note: /auth/login is POST and public, but many others use get_current_user
        # Let's use a route that requires auth, like /resume/roadmap (requires target_role)
        response = requests.get(
            f"{BASE_URL}/resume/roadmap?target_role=Developer",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200:
            print(f"✅ Token accepted")
        elif response.status_code == 401:
            print(f"❌ Token rejected (401): {response.json().get('detail')}")
        else:
            print(f"❓ Unexpected response ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"❌ Error during test: {e}")

# 1. Test Valid Token
valid_token = create_manual_token("student_demo@test.com", 3600)
test_token("Valid Token (1 hour)", valid_token)

# 2. Test Expired Token
expired_token = create_manual_token("student_demo@test.com", -3600)
test_token("Expired Token (-1 hour)", expired_token)
