import ArticleModel from "../models/Article.model.js";
import { v4 as uuid } from "uuid";
import UserModel from "../models/User.model.js";
import axios from "axios";

export async function createArticle(req, res) {
  try {
    // console.log(req, res);
    console.log("hell");
    const Article = await ArticleModel.create({
      ...req.body,
      _id: `${uuid().replace(/-/g, "_")}`,
    });
    const response = axios.post("https://translator-sih-2022.herokuapp.com/", {
      sentence: req.body.content.en,
      id: Article._id,
    });
    return res.status(201).json({
      status: "success",
      data: Article,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getArticle(req, res) {
  if (!req.query.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID",
    });
  }

  try {
    const Article = await ArticleModel.findById(req.query.id);
    return res.status(200).json(Article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getArticles(req, res) {
  try {
    const Articles = await ArticleModel.find(
      {},
      {
        _id: 1,
        title: 1,
        thumbnail: 1,
        createdAt: 1,
        slug: 1,
        views: 1,
        likes: 1,
        createdBy: 1,
      }
    )
      .sort({ createdAt: "desc" })
      .limit(req.query.limit || 10);
    return res.status(200).json(Articles);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateArticle(req, res) {
  if (!req.body.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Article",
    });
  }

  try {
    console.log(req.body);
    const ArticleUpdate = await ArticleModel.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: ArticleUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteArticle(req, res) {
  if (!req.query.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID",
    });
  }

  try {
    const res = await ArticleModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({
      status: "success",
      data: res,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateArticleLikes(req, res) {
  if (!req.body.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Article",
    });
  }
  try {
    const Article = await ArticleModel.findById(req.body.id);
    let likes = Article.likes;
    const isLiked = likes.includes(req.body.userId);
    if (isLiked) {
      likes = likes.filter((like) => like !== req.body.userId);
      await UserModel.findByIdAndUpdate(req.body.userId, {
        $pull: { likedArticles: req.body.id },
      });
    } else {
      likes.push(req.body.userId);
      await UserModel.findByIdAndUpdate(
        req.body.userId,
        {
          $push: { likedArticles: req.body.articleId },
        },
        { new: true }
      );
    }
    const LikesUpdated = await ArticleModel.findByIdAndUpdate(
      req.body.articleId,
      { likes: likes },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: LikesUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateArticleViews(req, res) {
  if (!req.body.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Article",
    });
  }
  try {
    const ViewsUpdated = await ArticleModel.findByIdAndUpdate(
      req.body.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: ViewsUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function userSaveArticle(req, res) {
  if (!req.body.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Article",
    });
  }
  try {
    const SavedUpdated = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $push: { savedArticles: req.body.id },
      },
      { new: true, upsert: true }
    );
    await ArticleModel.findByIdAndUpdate(
      req.body.id,
      {
        $inc: { savedByCount: 1 },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: SavedUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
