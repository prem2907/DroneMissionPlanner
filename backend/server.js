import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import missionRoutes from "./routes/missionRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, { cors: { origin: "*" } }); // Enable CORS for frontend

app.use(cors());
app.use(express.json());
app.use("/api/missions", missionRoutes);

// Connect to Database
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// WebSocket Connection
io.on("connection", (socket) => {
    console.log("🟢 A user connected");

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected");
    });
});

// Export io instance
export { io };
