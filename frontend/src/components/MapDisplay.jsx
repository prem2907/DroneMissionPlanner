import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";

const MapDisplay = ({ missions }) => {
    const mapContainerStyle = { width: "100%", height: "400px" };

    // Dynamically adjust center based on the first mission's start location
    const center = missions.length > 0
        ? { lat: missions[0].startLat, lng: missions[0].startLng }
        : { lat: 28.6139, lng: 77.2090 }; // Default to Delhi if no missions exist

    const [visibleMissions, setVisibleMissions] = useState(missions);

    useEffect(() => {
        // Filter out "Cancelled" missions immediately
        const updatedMissions = missions.filter(mission => mission.status !== "Cancelled");
        setVisibleMissions(updatedMissions);

        // Remove "Completed" routes and markers after 5 seconds
        const timeoutIds = updatedMissions.map((mission) => {
            if (mission.status === "Completed") {
                return setTimeout(() => {
                    setVisibleMissions((prev) => prev.filter((m) => m._id !== mission._id));
                }, 5000);
            }
            return null;
        });

        return () => {
            timeoutIds.forEach(id => id && clearTimeout(id));
        };
    }, [missions]);

    return (
        <LoadScript googleMapsApiKey="GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
                {visibleMissions.map((mission) => {
                    let lineColor = "#FF0000"; // Default red
                    if (mission.status === "In Progress") lineColor = "#0000FF"; // Blue
                    if (mission.status === "Completed") lineColor = "#008000"; // Green

                    return (
                        <React.Fragment key={mission._id}>
                            {/* Show markers only if mission is NOT completed */}
                            {mission.status !== "Completed" && (
                                <>
                                    <Marker position={{ lat: mission.startLat, lng: mission.startLng }}
                                        label={{ text: mission.startCity || "Start", fontSize: "12px" }} />
                                    <Marker position={{ lat: mission.destLat, lng: mission.destLng }}
                                        label={{ text: mission.destCity || "Destination", fontSize: "12px" }} />
                                </>
                            )}

                            <Polyline
                                path={[
                                    { lat: mission.startLat, lng: mission.startLng },
                                    ...(mission.waypoints || []).map((wp) => ({
                                        lat: wp.lat,
                                        lng: wp.lng,
                                    })),
                                    { lat: mission.destLat, lng: mission.destLng }
                                ]}
                                options={{ strokeColor: lineColor, strokeOpacity: 0.8, strokeWeight: 4 }}
                            />
                        </React.Fragment>
                    );
                })}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapDisplay;
