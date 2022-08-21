import express from "express";

import { getAllImages } from "../controllers/image.js";
const router = express.Router();

router.get("/all", getAllImages);

export default router;
