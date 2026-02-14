from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

try:
    print("Testing bcrypt hashing...")
    hash = pwd_context.hash("password123")
    print(f"✅ Hash success: {hash}")
    
    print("Testing verification...")
    verify = pwd_context.verify("password123", hash)
    print(f"✅ Verify success: {verify}")
except Exception as e:
    import traceback
    print(f"❌ Bcrypt Failed: {e}")
    print(traceback.format_exc())
