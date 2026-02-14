import requests

BASE_URL = "http://127.0.0.1:8000"

def test_login():
    # Use a random email to test auto-registration + login
    import random
    email = f"student_test_{random.randint(1000,9999)}@test.com"
    password = "password123"
    
    print(f"Testing Login with: {email}")
    
    # 1. Test Regular Login (Form Data)
    try:
        data = {
            "username": email,
            "password": password
        }
        # Note: requests.post with 'data=' sends form-urlencoded by default
        response = requests.post(f"{BASE_URL}/auth/login", data=data)
        
        if response.status_code == 200:
            print("✅ Login Successful!")
            print(response.json())
        else:
            print(f"❌ Login Failed: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    test_login()
