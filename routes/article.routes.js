import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "../controllers/article.js";

const router = express.Router();

router.get("/all", getArticles);
router.get("/single", getArticle);
router.post("/create", createArticle);
router.patch("/update", updateArticle);
router.delete("/delete", deleteArticle);

export default router;
