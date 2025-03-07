from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
import uvicorn
from PIL import Image

# 🔹 Load Model
model = tf.keras.models.load_model("property_classifier.h5")

# 🔹 Kategori Properti
labels = ["Kolam Renang", "Dapur Modern", "Pemandangan Laut", "Kamar Tidur", "NSFW"]

# 🔹 Inisialisasi API
app = FastAPI()

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    try:
        # 🔹 Baca Gambar
        contents = await file.read()
        img = Image.open(BytesIO(contents)).resize((224, 224)).convert("RGB")
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 🔹 Prediksi Kategori
        predictions = model.predict(img_array)
        predicted_class = labels[np.argmax(predictions)]

        return {
            "status": "success",
            "prediction": predicted_class
        }

    except Exception as e:
        return {"error": str(e)}

# 🔹 Menjalankan API
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
