import express from "express";
import { userLogin } from "../controllers/auth.js";

const router = express.Router();

// we need user token and the id for all auth routes
router.post("/login", userLogin); // to get all teachers data

export default router;
