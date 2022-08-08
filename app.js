import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send({ status: "success", message: "Server running on PORT " + PORT });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
