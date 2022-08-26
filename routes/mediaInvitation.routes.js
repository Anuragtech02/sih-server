import express from "express";
import {
  createMediaInvitation,
  getMediaInvitationPIB,
  updateMediaInvitation,
} from "../controllers/mediaInvitation.js";

const router = express.Router();

router.post("/create", createMediaInvitation);
router.patch("/update", updateMediaInvitation);
router.get("/rss-media", getMediaInvitationPIB);

export default router;
