import React, { useState } from "react";
import { createMission } from "../services/missionService";

const cityData = {
    "New York": { lat: 40.7128, lng: -74.0060 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "London": { lat: 51.5074, lng: -0.1278 },
    "Delhi": { lat: 28.6139, lng: 77.2090 },
    "Tokyo": { lat: 35.682839, lng: 139.759455 },
    "Paris": { lat: 48.8566, lng: 2.3522 }
};

const MissionForm = ({ onMissionAdded }) => {
    const [form, setForm] = useState({ name: "", startCity: "", destCity: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.startCity || !form.destCity) {
            alert("Please select both Start and Destination cities.");
            return;
        }

        // Get latitude & longitude from cityData
        const startCoords = cityData[form.startCity];
        const destCoords = cityData[form.destCity];

        const formattedMission = {
          name: form.name,
          startCity: form.startCity,
          destCity: form.destCity,
          startLat: startCoords.lat,
          startLng: startCoords.lng,
          destLat: destCoords.lat,
          destLng: destCoords.lng
      };

        await createMission(formattedMission);
        setForm({ name: "", startCity: "", destCity: "" });
        onMissionAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <input type="text" placeholder="Mission Name" className="form-control mb-2"
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <div className="mb-2">
                <label className="form-label">Start City:</label>
                <select className="form-select"
                    value={form.startCity}
                    onChange={(e) => setForm({ ...form, startCity: e.target.value })} required>
                    <option value="">Select a city</option>
                    {Object.keys(cityData).map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <div className="mb-2">
                <label className="form-label">Destination City:</label>
                <select className="form-select"
                    value={form.destCity}
                    onChange={(e) => setForm({ ...form, destCity: e.target.value })} required>
                    <option value="">Select a city</option>
                    {Object.keys(cityData).map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create Mission</button>
        </form>
    );
};

export default MissionForm;
