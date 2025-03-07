import Mission from "../models/Mission.js";
import { io } from "../server.js"; // Import WebSocket instance

// Create a new mission
export const createMission = async (req, res) => {
  try {
      console.log("Received Mission Data:", req.body); // Debugging log

      const mission = await Mission.create(req.body);
      res.status(201).json(mission);
  } catch (error) {
      console.error("Mission Creation Error:", error);
      res.status(400).json({ message: error.message });
  }
};


// Get all missions
export const getMissions = async (req, res) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Mission Status
export const updateMissionStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      const mission = await Mission.findById(id);
      if (!mission) return res.status(404).json({ message: "Mission not found" });

      // Prevent canceling a "Pending" mission
      if (mission.status === "Pending" && status === "Cancelled") {
          return res.status(400).json({ message: "Pending missions cannot be cancelled" });
      }

      mission.status = status;
      await mission.save();
      io.emit("missionUpdated", mission); // Notify all clients

      // 🚀 Simulate mission movement when "Start" is clicked
      if (status === "In Progress") {
          simulateMissionProgress(mission);
      }

      res.json(mission);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Function to simulate mission movement
const simulateMissionProgress = async (mission) => {
  let progress = 0;
  const totalSteps = 5; // Number of updates before completion

  const updateInterval = setInterval(async () => {
      progress++;

      // If mission is cancelled mid-way, stop simulation
      const updatedMission = await Mission.findById(mission._id);
      if (updatedMission.status === "Cancelled") {
          clearInterval(updateInterval);
          return;
      }

      if (progress >= totalSteps) {
          // Mark mission as "Completed"
          updatedMission.status = "Completed";
          await updatedMission.save();
          io.emit("missionUpdated", updatedMission);
          clearInterval(updateInterval);
      } else {
          // Simulate intermediate progress
          io.emit("missionProgress", { id: mission._id, progress });
      }
  }, 2000); // Update every 2 seconds
};

// Delete a mission by ID
// Delete a mission by ID
export const deleteMission = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(`Deleting mission with ID: ${id}`); // ✅ Debug log

        const deletedMission = await Mission.findByIdAndDelete(id);

        if (!deletedMission) {
            console.log("Mission not found in DB"); // ✅ Debug log
            return res.status(404).json({ message: "Mission not found" });
        }

        console.log("Mission successfully deleted from DB"); // ✅ Debug log

        // Notify all clients in real-time that a mission was deleted
        io.emit("missionDeleted", { id });

        res.json({ message: "Mission deleted successfully" });
    } catch (error) {
        console.error("Error deleting mission:", error);
        res.status(500).json({ message: error.message });
    }
};

