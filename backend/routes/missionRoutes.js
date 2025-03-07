import express from "express";
import { createMission, getMissions, updateMissionStatus } from "../controllers/missionController.js";

const router = express.Router();

router.post("/", createMission);
router.get("/", getMissions);
router.put("/:id/status", updateMissionStatus); // ✅ Route for updating status

export default router;
