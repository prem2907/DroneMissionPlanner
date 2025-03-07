import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startCity: { type: String, required: true }, // ✅ Add this
  startLat: { type: Number, required: true },
  startLng: { type: Number, required: true },
  destCity: { type: String, required: true }, // ✅ Add this
  destLat: { type: Number, required: true },
  destLng: { type: Number, required: true },
  waypoints: [{ lat: Number, lng: Number }],
  status: { type: String, enum: ["Pending", "In Progress", "Completed", "Cancelled"], default: "Pending" }
}, { timestamps: true });

const Mission = mongoose.model("Mission", missionSchema);
export default Mission;
