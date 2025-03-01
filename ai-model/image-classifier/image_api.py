from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
import cv2
import joblib
from PIL import Image
from io import BytesIO


# Load trained model and class indices
model = tf.keras.models.load_model("stayai_image_model.h5")
class_indices = joblib.load("class_indices.pkl")
index_to_label = {v: k for k, v in class_indices.items()}


app = FastAPI()


def preprocess_image(image):
    image = Image.open(BytesIO(image))
    image = image.resize((224, 224))
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)
    return image


@app.post("/predict-room")
async def predict_room(file: UploadFile = File(...)):
    image = await file.read()
    preprocessed = preprocess_image(image)

    prediction = model.predict(preprocessed)
    predicted_label = index_to_label[np.argmax(prediction)]

    return {"room_type": predicted_label}


@app.post("/check-quality")
async def check_quality(file: UploadFile = File(...)):
    image = await file.read()
    image = Image.open(BytesIO(image))
    image_array = np.array(image)

    # Convert to grayscale
    gray = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
    
    # Check blur using Laplacian variance
    blur = cv2.Laplacian(gray, cv2.CV_64F).var()

    if blur < 100:  # Adjust threshold for blur detection
        return {"quality": "Poor", "reason": "Image is too blurry"}
    else:
        return {"quality": "Good", "reason": "Image is clear"}
