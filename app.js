import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/user", userRoutes);

const DATABASE_URL = process.env.DB_URI;

mongoose.connect(`${DATABASE_URL}/${DB_NAME}`);

app.get("/", (req, res) => {
  res.send({ status: "success", message: "Server running on PORT " + PORT });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
