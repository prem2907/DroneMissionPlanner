const API_URL = "http://localhost:5000/api/missions";

// Fetch all missions
export const getMissions = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Create a new mission
export const createMission = async (mission) => {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mission),
    });
};

// Update mission status
export const updateMissionStatus = async (id, status) => {
    await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
};

// Delete a mission by ID
export const deleteMission = async (id) => {
    try {
        console.log(`📤 Sending DELETE request for mission ID: ${id}`);

        const response = await fetch(`http://localhost:5000/api/missions/${id}`, {
            method: "DELETE"
        });

        const textResponse = await response.text(); // Read response as text
        console.log("📥 Raw Response:", textResponse);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} - ${textResponse}`);
        }

        const data = JSON.parse(textResponse); // Convert to JSON if valid
        console.log("✅ Delete response:", data);

        return data;
    } catch (error) {
        console.error("🔥 Error deleting mission:", error);
        alert(error.message);
    }
};

