import express from "express";

import { getAllLiveVideos } from "../controllers/liveVideo.js";
const router = express.Router();

router.get("/allVideos", getAllLiveVideos);
export default router;
