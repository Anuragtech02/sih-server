import express from "express";

import {
  getAdmins,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  getSingleAdmin,
} from "../controllers/admin.js";
import { adminAuthCheck } from "../middlewares/auth.js";
const router = express.Router();

// we need user token and the id for all auth routes
router.get("/", getAdmins); // to get all teachers data
router.post("/create", createAdmin); // to create new user
router.delete("/:id", adminAuthCheck, deleteAdmin); // to delete user
router.patch("/:id", adminAuthCheck, updateAdmin); // to update user info
router.get("/single", getSingleAdmin);

export default router;
