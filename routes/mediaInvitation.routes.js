import express from "express";
import { createMediaInvitation, updateMediaInvitation } from "../controllers/mediaInvitation.js";

const router = express.Router();

router.post("/create", createMediaInvitation);
router.patch("/update", updateMediaInvitation);

export default router;