import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import numpy as np
import os

# 🔹 Load Public Dataset (Places365 - Tempat Umum)
dataset_name = "places365_small"

# 🔹 Download dataset dari TensorFlow Datasets (tfds)
dataset, info = tfds.load(dataset_name, split=["train", "test"], with_info=True, as_supervised=True)

# 🔹 Preprocessing (Resize & Normalize)
def preprocess(image, label):
    image = tf.image.resize(image, (224, 224)) / 255.0  # Resize & Normalization
    return image, label

train_dataset = dataset[0].map(preprocess).batch(32)
test_dataset = dataset[1].map(preprocess).batch(32)

# 🔹 Model CNN (Menggunakan Transfer Learning - MobileNetV2)
base_model = tf.keras.applications.MobileNetV2(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False  # Tidak melatih ulang layer awal

model = Sequential([
    base_model,
    Flatten(),
    Dense(512, activation="relu"),
    Dropout(0.3),
    Dense(256, activation="relu"),
    Dropout(0.3),
    Dense(info.features["label"].num_classes, activation="softmax")  # Output sesuai jumlah kategori
])

# 🔹 Compile Model
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

# 🔹 Training Model
model.fit(train_dataset, validation_data=test_dataset, epochs=5)

# 🔹 Simpan Model
model.save("property_classifier_public.h5")

print("✅ Model training complete using public dataset!")
