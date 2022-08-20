import express from "express";

import { getAllLiveVideos, createLiveVideo } from "../controllers/liveVideo.js";
const router = express.Router();

router.get("/allVideos", getAllLiveVideos);
router.post("/createLiveVideo", createLiveVideo);
export default router;
