import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
import joblib

# 🔹 Step 1: Gabungkan 6 Dataset dengan Tipe Data yang Jelas
file_paths = [
    "Datasets/data.csv", "Datasets/data1.csv", "Datasets/data2.csv",
    "Datasets/data3.csv", "Datasets/data4.csv", "Datasets/data5.csv"
]

df_list = [pd.read_csv(file, dtype={"room_type": str}, low_memory=False) for file in file_paths]
data = pd.concat(df_list, ignore_index=True)

# 🔹 Step 2: Pilih Kolom yang Dibutuhkan (Tanpa `neighbourhood`)
selected_features = ["latitude", "longitude", "minimum_nights", "room_type", "price"]
data = data[selected_features]

# 🔹 Step 3: Bersihkan `price` dari simbol "$" dan koma, lalu konversi ke float
data["price"] = data["price"].astype(str).str.replace(r'[\$,]', '', regex=True).astype(float)

# 🔹 Step 4: Handle Missing Values
data.fillna({
    "minimum_nights": data["minimum_nights"].median(),
    "room_type": "Unknown"
}, inplace=True)

# 🔹 Step 5: Encode Kategorikal (`room_type` saja)
encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)  # ✅ Fix `sparse=False`
encoded_features = encoder.fit_transform(data[["room_type"]])

# 🔹 Step 6: Standarisasi Fitur Numerik (`latitude`, `longitude`, `minimum_nights`)
numerical_features = ["latitude", "longitude", "minimum_nights"]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(data[numerical_features])

# 🔹 Step 7: Gabungkan Semua Fitur
X = np.hstack((encoded_features, scaled_features))
y = data["price"]

# 🔹 Step 8: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🔹 Step 9: Train Model Random Forest
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 🔹 Step 10: Simpan Model dan Encoder untuk Prediksi Masa Depan
joblib.dump(model, "price_model.pkl")
joblib.dump(encoder, "encoder.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model training complete. Saved model as 'price_model.pkl'.")
