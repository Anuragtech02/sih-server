import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
  userSaveArticle,
  updateArticleLikes,
  updateArticleViews,
  getArticlesFromRss,
  getPressReleasePIB,
  getMediaInvitationPIB,
  getPhotosPIB,
} from "../controllers/article.js";

const router = express.Router();

router.get("/all", getArticles);
router.get("/single", getArticle);
router.post("/create", createArticle);
router.patch("/update", updateArticle);
router.delete("/delete", deleteArticle);
router.patch("/user-save", userSaveArticle);
router.patch("/likes", updateArticleLikes);
router.patch("/views", updateArticleViews);
router.get("/rss", getArticlesFromRss);
router.get("/rss-releases", getPressReleasePIB);
router.get("/rss-media", getMediaInvitationPIB);
router.get("/rss-photos", getPhotosPIB);

export default router;
