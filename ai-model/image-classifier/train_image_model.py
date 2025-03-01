import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import joblib

# Define image size and batch size
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

# Load dataset from directory (Ensure data is structured as /train/room_type, /test/room_type)
train_dir = "dataset/train"
test_dir = "dataset/test"

# Image Data Generators (for augmentation)
train_datagen = ImageDataGenerator(rescale=1./255, rotation_range=20, zoom_range=0.2, horizontal_flip=True)
test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(train_dir, target_size=IMAGE_SIZE, batch_size=BATCH_SIZE, class_mode="categorical")
test_generator = test_datagen.flow_from_directory(test_dir, target_size=IMAGE_SIZE, batch_size=BATCH_SIZE, class_mode="categorical")

# Define CNN Model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),

    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(len(train_generator.class_indices), activation='softmax')  # Number of categories
])

# Compile Model
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Train Model
model.fit(train_generator, epochs=10, validation_data=test_generator)

# Save Model
model.save("stayai_image_model.h5")
joblib.dump(train_generator.class_indices, "class_indices.pkl")

print("✅ AI Model Training Completed!")
