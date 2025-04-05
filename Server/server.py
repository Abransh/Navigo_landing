from fastapi import FastAPI, HTTPException, Query
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="User Registration API")

# Setup MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["Navigo"]
    waitlistCollection = db["Waitlist"]
    feedbackCollection = db["Feedback"]
    # Verify connection
    client.admin.command('ping')
    print("Connected to MongoDB successfully!")
except ConnectionFailure:
    print("Failed to connect to MongoDB. Make sure MongoDB is running.")

@app.post("/joinWaitlist")
async def register_user(
    EMAIL: str = Query(..., description="User's email address"),
    NAME: str = Query(..., description="User's full name"),
    MOBILE_NUMBER: str = Query(..., description="User's mobile number")
):
    """Register a new user with the provided details"""
    # Create user data dictionary
    user_data = {"EMAIL": EMAIL, "NAME": NAME, "MOBILE_NUMBER": MOBILE_NUMBER}
    
    # Insert into MongoDB
    try:
        result = waitlistCollection.insert_one(user_data)
        return {
            "status": "success",
            "message": "User registered successfully",
            "id": str(result.inserted_id),
            "collection": waitlistCollection.name
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to register user: {str(e)}")



@app.post("/feedback")
async def submit_feedback(
    NAME: str = Query(..., description="User's name"),
    EMAIL : str = Query(..., description="User's email address"),
    SUBJECT: str = Query(..., description="Feedback subject"),
    MESSAGE: str = Query(..., description="Feedback message")
):
    """Submit feedback from a user"""
    # Create feedback data dictionary
    feedback_data = {"MESSAGE": MESSAGE, "NAME": NAME, "EMAIL": EMAIL, "SUBJECT": SUBJECT}
    
    # Insert into MongoDB
    try:
        result = feedbackCollection.insert_one(feedback_data)
        return {
            "status": "success",
            "message": "Feedback submitted successfully",
            "id": str(result.inserted_id),
            "collection": feedbackCollection.name
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit feedback: {str(e)}")

# For local development
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)