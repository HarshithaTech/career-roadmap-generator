import requests
import time

# Clean previous token
token = None
BASE_URL = "http://127.0.0.1:8000"

# 1. Login
try:
    print("Logging in...")
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": "student_demo@test.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    if login_response.status_code == 200:
        token = login_response.json()["access_token"]
        print("✅ Login Successful")
    else:
        print(f"❌ Login Failed: {login_response.status_code}")
        exit(1)
except Exception as e:
    print(f"❌ Login Error: {e}")
    exit(1)

# 2. Upload Resume (Mocked)
# We need to simulate a file upload to trigger the ResumeParserAgent fallback
files = {'file': ('resume.pdf', b'%PDF-1.4 mock content', 'application/pdf')}
try:
    print("\nUploading Resume (Triggering Parser Mock)...")
    upload_response = requests.post(
        f"{BASE_URL}/resume/upload",
        files=files,
        headers={"Authorization": f"Bearer {token}"}
    )
    if upload_response.status_code == 200:
        data = upload_response.json()
        print(f"✅ Upload Success! Score: {data.get('score')}")
        print(f"Skills Found: {[s['name'] for s in data.get('skills', [])]}")
    else:
        print(f"❌ Upload Failed: {upload_response.status_code}")
        print(upload_response.text)
except Exception as e:
    print(f"❌ Upload Error: {e}")

# 3. Request Roadmap (Triggering Planner Mock)
try:
    print("\nRequesting Roadmap for 'Generative AI Engineer'...")
    roadmap_response = requests.get(
        f"{BASE_URL}/resume/roadmap?target_role=Generative AI Engineer",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if roadmap_response.status_code == 200:
        data = roadmap_response.json()
        print("✅ Roadmap Generated!")
        print(f"Weeks Generated: {len(data.get('weeks', []))}")
        print(f"First Topic: {data.get('weeks', [])[0]['topics'][0] if data.get('weeks') else 'None'}")
    else:
        print(f"❌ Roadmap Failed: {roadmap_response.status_code}")
        print(roadmap_response.text)

except Exception as e:
    print(f"❌ Request Error: {e}")
