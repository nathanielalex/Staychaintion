import { useState } from "react";
import axios from "axios";

export default function RoomClassifier() {
  const [image, setImage] = useState<File | null>(null);
  const [roomType, setRoomType] = useState<string | null>(null);

  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict-room", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setRoomType(response.data.room_type);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Upload Room Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button onClick={handleImageUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Predict Room Type
      </button>

      {roomType && (
        <p className="mt-4 text-lg font-semibold text-green-600">
          Predicted Room Type: {roomType}
        </p>
      )}
    </div>
  );
}
