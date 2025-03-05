from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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


# try:
#     model = joblib.load("best_price_model.pkl")
#     encoder = joblib.load("best_encoder.pkl")
#     scaler = joblib.load("best_scaler.pkl")
# except Exception as e:
#     raise RuntimeError(f"Error loading model or encoders: {e}")


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

class PredictionInput(BaseModel):
    latitude: float
    longitude: float
    minimum_nights: int
    room_type: str

@app.post("/predict")
def predict_price(data: PredictionInput):
    try:
        # Debugging log
        print("Received input:", data.dict())

        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.dict()])

        # Encode categorical variables (room_type) correctly
        encoded_room_type = encoder.transform(input_data[["room_type"]])  # ✅ FIX: Remove .toarray()

        # Scale numerical variables
        scaled_nums = scaler.transform(input_data[["latitude", "longitude", "minimum_nights"]])

        # Combine categorical and numerical features
        X_input = np.hstack((encoded_room_type, scaled_nums))  # ✅ FIX: Ensure proper array handling

        # Debugging log
        print("Processed input shape:", X_input.shape)

        # Predict price
        predicted_price = model.predict(X_input)[0]

        return {
            "status": "success",
            "predicted_price": round(predicted_price, 2),
            "currency": "USD"
        }

    except Exception as e:
        print("Prediction error:", str(e))
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
