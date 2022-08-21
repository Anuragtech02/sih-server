import express from "express";

import { getAllLiveVideos, createLiveVideo } from "../controllers/liveVideo.js";
const router = express.Router();

router.get("/all", getAllLiveVideos);
router.post("/create", createLiveVideo);
export default router;
