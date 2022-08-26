import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import articleRoutes from "./routes/article.routes.js";
import authRoutes from "./routes/auth.routes.js";
import imageRoutes from "./routes/image.routes.js";
import livevideoRoutes from "./routes/video.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import mediaInvitation from "./routes/mediaInvitation.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import admin from "./firebase.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
dotenv.config();

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/article", articleRoutes);
app.use("/image", imageRoutes);
app.use("/live", livevideoRoutes);
app.use("/auth", authRoutes);
app.use("/notification", notificationRoutes);
app.use("/mediaInvitation", mediaInvitation);

const DATABASE_URL = process.env.DB_URI;

mongoose.connect(`${DATABASE_URL}`);

app.get("/", (req, res) => {
  res.send({ status: "success", message: "Server running on PORT " + PORT });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
