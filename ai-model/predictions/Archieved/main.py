from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # ✅ Import Pydantic for data validation
import joblib
import numpy as np
import pandas as pd

app = FastAPI()

# Load the trained model and encoders
try:
    model = joblib.load("price_model.pkl")
    encoder = joblib.load("encoder.pkl")
    scaler = joblib.load("scaler.pkl")
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Staychaintion Price Prediction API"}

# ✅ Define a Pydantic model for the expected request payload
class PredictionInput(BaseModel):
    neighbourhood_group: str
    neighbourhood: str
    room_type: str
    latitude: float
    longitude: float
    minimum_nights: int
    number_of_reviews: int
    reviews_per_month: float
    calculated_host_listings_count: int
    availability_365: int

@app.post("/predict")
def predict_price(data: PredictionInput):  # ✅ Use Pydantic model for validation
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.dict()])

        # Encode categorical variables
        encoded_cats = encoder.transform(input_data[["neighbourhood_group", "neighbourhood", "room_type"]]).toarray()

        # Scale numerical variables
        scaled_nums = scaler.transform(input_data[["latitude", "longitude", "minimum_nights",
                                                   "number_of_reviews", "reviews_per_month",
                                                   "calculated_host_listings_count", "availability_365"]])

        # Combine categorical and numerical features
        X_input = np.hstack((encoded_cats, scaled_nums))

        # Predict price
        predicted_price = model.predict(X_input)[0]  

        return {"status": "success", "predicted_price": round(predicted_price, 2), "currency": "USD"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
