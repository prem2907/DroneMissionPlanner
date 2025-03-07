import React from "react";
import MissionPlanner from "./pages/MissionPlanner";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="container">
            <h1 className="text-center mt-4">Drone Mission Planner</h1>
            <MissionPlanner />
        </div>
    );
}

export default App;
