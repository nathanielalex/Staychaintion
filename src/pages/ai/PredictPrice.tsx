import { useState } from "react";
import axios from "axios";

export default function PredictPrice() {
  const [formData, setFormData] = useState({
    neighbourhood_group: "Brooklyn",
    neighbourhood: "Kensington",
    room_type: "Private room",
    latitude: 40.64749,
    longitude: -73.97237,
    minimum_nights: 1,
    number_of_reviews: 9,
    reviews_per_month: 0.21,
    calculated_host_listings_count: 6,
    availability_365: 365,
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predictPrice = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Predict Airbnb Price</h2>
      <div className="grid grid-cols-2 gap-4 text-white">
        <select name="neighbourhood_group" onChange={handleChange} className="border p-2">
          <option value="Brooklyn">Brooklyn</option>
          <option value="Manhattan">Manhattan</option>
        </select>
        <select name="room_type" onChange={handleChange} className="border p-2">
          <option value="Private room">Private Room</option>
          <option value="Entire home/apt">Entire Home</option>
        </select>
        <input type="number" name="latitude" onChange={handleChange} className="border p-2" value={formData.latitude} />
        <input type="number" name="longitude" onChange={handleChange} className="border p-2" value={formData.longitude} />
        <input type="number" name="minimum_nights" onChange={handleChange} className="border p-2" value={formData.minimum_nights} />
        <input type="number" name="number_of_reviews" onChange={handleChange} className="border p-2" value={formData.number_of_reviews} />
        <input type="number" name="reviews_per_month" onChange={handleChange} className="border p-2" value={formData.reviews_per_month} />
        <input type="number" name="calculated_host_listings_count" onChange={handleChange} className="border p-2" value={formData.calculated_host_listings_count} />
        <input type="number" name="availability_365" onChange={handleChange} className="border p-2" value={formData.availability_365} />
      </div>
      <button onClick={predictPrice} className="mt-4 bg-blue-600 text-white p-2 rounded">
        Predict Price
      </button>
      {prediction && <h3 className="mt-4 text-black">Predicted Price: ${prediction} / night</h3>}
    </div>
  );
}
