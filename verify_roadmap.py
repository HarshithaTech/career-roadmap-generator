import requests

# Clean previous token
token = None

# 1. Login to get token
try:
    print("Logging in...")
    login_response = requests.post(
        "http://127.0.0.1:8000/auth/login",
        data={"username": "student_demo@test.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    if login_response.status_code == 200:
        token = login_response.json()["access_token"]
        print("✅ Login Successful")
    else:
        print(f"❌ Login Failed: {login_response.status_code}")
        print(login_response.text)
        exit(1)
except Exception as e:
    print(f"❌ Login Error: {e}")
    exit(1)

# 2. Request Roadmap
try:
    print("\nRequesting Roadmap for 'Generative AI Engineer'...")
    response = requests.get(
        "http://127.0.0.1:8000/resume/roadmap?target_role=Generative AI Engineer",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code == 200:
        print("✅ Roadmap Generated Successfully!")
        print(response.json())
    else:
        print(f"❌ Roadmap Failed: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"❌ Request Error: {e}")
