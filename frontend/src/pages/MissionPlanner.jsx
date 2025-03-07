import React, { useEffect, useState } from "react";
import { getMissions, updateMissionStatus, deleteMission } from "../services/missionService";
import { io } from "socket.io-client";
import MissionForm from "../components/MissionForm";
import MapDisplay from "../components/MapDisplay";
import { Trash } from "react-bootstrap-icons";

const socket = io("http://localhost:5000"); // Connect to WebSocket server

const MissionPlanner = () => {
  const [missions, setMissions] = useState([]);
  const [progress, setProgress] = useState({}); // Store progress of each mission

  useEffect(() => {
    fetchMissions();

    // Listen for mission updates
    socket.on("missionUpdated", (updatedMission) => {
      setMissions((prevMissions) =>
        prevMissions.map((mission) =>
          mission._id === updatedMission._id ? updatedMission : mission
        )
      );
    });

    // Listen for mission deleted events
    socket.on("missionDeleted", ({ id }) => {
      setMissions((prevMissions) =>
        prevMissions.filter((mission) => mission._id !== id)
      );
    });

    return () => {
      socket.off("missionUpdated");
      socket.off("missionDeleted");
    };
  }, []);

  const fetchMissions = async () => {
    const data = await getMissions();
    setMissions(data);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await updateMissionStatus(id, newStatus);
    if (newStatus === "In Progress") {
      setProgress({ ...progress, [id]: 0 }); // Reset progress when mission starts
    }
  };

  const handleDeleteMission = async (id) => {
    await deleteMission(id);
    // Fetch updated mission list after deletion
    fetchMissions();
  };

  return (
    <div className="container mt-4">
      <h2>Mission Planner</h2>
      <MissionForm onMissionAdded={fetchMissions} />
      <MapDisplay missions={missions} />

      <ul className="list-group mt-3">
        {missions.map((mission) => {
          let bgColor = "";
          if (mission.status === "Cancelled") bgColor = "bg-secondary"; // Grey
          if (mission.status === "Completed") bgColor = "bg-success text-white"; // Green
          if (mission.status === "Pending") bgColor = "bg-light"; // Default
          if (mission.status === "In Progress") bgColor = "bg-warning"; // Yellow

          return (
            <li
              key={mission._id}
              className={`list-group-item d-flex justify-content-between align-items-center ${bgColor}`}
            >
              <div>
                <strong>{mission.name}</strong>
                <br />
                <span className="text-primary">
                  <b>Start:</b> {mission.startCity || "Unknown"}
                </span>
                <span> ➝ </span>
                <span className="text-danger">
                  <b>Destination:</b> {mission.destCity || "Unknown"}
                </span>
                <br />
                <span className={`badge bg-dark mt-1`}>{mission.status}</span>
                {mission.status === "In Progress" && progress[mission._id] !== undefined && (
                  <span className="ms-3">🚀 Progress: {progress[mission._id]}%</span>
                )}
              </div>
              <div className="d-flex align-items-center">
                {mission.status === "Pending" && (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleStatusUpdate(mission._id, "In Progress")}
                  >
                    Start
                  </button>
                )}
                {mission.status === "In Progress" && (
                  <>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleStatusUpdate(mission._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatusUpdate(mission._id, "Completed")}
                    >
                      Complete
                    </button>
                  </>
                )}

                {/* ✅ DELETE BUTTON */}
                <button
                  className="btn btn-outline-danger btn-sm ms-3"
                  onClick={() => handleDeleteMission(mission._id)}
                >
                  <Trash size={18} /> {/* 🗑️ Trash Icon */}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MissionPlanner;