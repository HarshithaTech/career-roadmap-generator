import requests
import os

token = None
BASE_URL = "http://127.0.0.1:8000"

# 1. Login to get token
try:
    print("Logging in...")
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": "student_demo@test.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    token = login_response.json()["access_token"]
    print("✅ Login Successful")
except Exception as e:
    print(f"❌ Login Failed: {e}")
    exit(1)

def test_upload(filename, content, content_type):
    print(f"\nTesting upload: {filename} ({content_type})")
    files = {'file': (filename, content, content_type)}
    try:
        response = requests.post(
            f"{BASE_URL}/resume/upload",
            files=files,
            headers={"Authorization": f"Bearer {token}"}
        )
        if response.status_code == 200:
            print(f"✅ Success: {response.json().get('message')}")
        else:
            print(f"❌ Failed ({response.status_code}): {response.json().get('detail')}")
    except Exception as e:
        print(f"❌ Error: {e}")

# Test 1: Supported PDF (Existing behavior)
test_upload('resume.pdf', b'%PDF-1.4 mock content', 'application/pdf')

# Test 2: Supported DOCX (New behavior)
test_upload('resume.docx', b'mock docx content', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')

# Test 3: Supported TXT (Existing behavior)
test_upload('resume.txt', b'mock text content', 'text/plain')

# Test 4: Unsupported type (Should give descriptive error)
test_upload('image.png', b'not a document', 'image/png')
