import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
import joblib

# Load dataset

# data = pd.read_csv(FILE_PATH)
data = pd.read_csv("Datasets/data.csv")

# Drop irrelevant columns
data = data.drop(columns=["id", "name", "host_id", "host_name", "last_review"])

# Handle missing values
data.fillna({
    "reviews_per_month": 0
}, inplace=True)

# Encode categorical features
categorical_features = ["neighbourhood_group", "neighbourhood", "room_type"]
encoder = OneHotEncoder(handle_unknown="ignore")
encoded_features = encoder.fit_transform(data[categorical_features]).toarray()

# Scale numerical features
numerical_features = ["latitude", "longitude", "minimum_nights", "number_of_reviews",
                      "reviews_per_month", "calculated_host_listings_count", "availability_365"]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(data[numerical_features])

# Combine processed features
X = np.hstack((encoded_features, scaled_features))
y = data["price"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model and encoders
joblib.dump(model, "price_model.pkl")
joblib.dump(encoder, "encoder.pkl")
joblib.dump(scaler, "scaler.pkl")
