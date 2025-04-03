from fastapi import FastAPI, HTTPException, Query
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="User Registration API")

# Setup MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["navigo_db"]
    collection = db["users"]
    # Verify connection
    client.admin.command('ping')
    print("Connected to MongoDB successfully!")
except ConnectionFailure:
    print("Failed to connect to MongoDB. Make sure MongoDB is running.")

@app.post("/joinWaitlist/")
async def register_user(
    email: str = Query(..., description="User's email address"),
    name: str = Query(..., description="User's full name"),
    mobile_number: str = Query(..., description="User's mobile number")
):
    """Register a new user with the provided details"""
    # Create user data dictionary
    user_data = {"email": email, "name": name, "mobile_number": mobile_number}
    
    # Insert into MongoDB
    try:
        result = collection.insert_one(user_data)
        return {
            "status": "success", 
            "message": "User registered successfully", 
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to register user: {str(e)}")

# For local development
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)