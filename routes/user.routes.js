import express from "express";

import {
  getData,
  createUser,
  deleteUser,
  updateUser,
  getSingleData,
  getLeaderboard,
} from "../controllers/user.js";
// import auth from "../middleware/auth.js";
const router = express.Router();

// we need user token and the id for all auth routes
router.get("/", getData); // to get all teachers data
router.post("/create", createUser); // to create new user
router.delete("/:id", deleteUser); // to delete user
router.patch("/update", updateUser); // to update user info
router.get("/single", getSingleData);
router.get("/leaderboard", getLeaderboard);

export default router;
