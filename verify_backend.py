import requests
import random
import string

BASE_URL = "http://127.0.0.1:8000"

def generate_random_email():
    return ''.join(random.choices(string.ascii_lowercase, k=10)) + "@test.com"

def test_registration():
    email = generate_random_email()
    password = "password123"
    name = "Test User"
    
    print(f"Attempting to register with: {email}")
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json={
            "email": email,
            "password": password,
            "name": name,
            "role": "student"
        })
        
        if response.status_code == 200:
            print("✅ Registration Successful!")
            print(response.json())
        else:
            print(f"❌ Registration Failed: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    test_registration()
