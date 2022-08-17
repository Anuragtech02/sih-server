import ArticleModel from "../models/Article.model.js";
import { v4 as uuid } from "uuid";

export async function createArticle(req, res) {
  try {
    // console.log(req, res);
    console.log("hell");
    const Article = await ArticleModel.create({
      ...req.body,
      _id: `${uuid().replace(/-/g, "_")}`,
    });
    console.log(Article);
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
    const Articles = await ArticleModel.find().limit(10);
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

export async function translateArticle(req, res) {
  if (!req.body)
    return res.status(400).json({
      status: "error",
      message: "Required Field Is Missing",
    });
  const { id, language } = body;
  if (!id || !language)
    return res.status(400).json({
      status: "error",
      message: "Required Field Is Missing",
    });
  try {
    const Article = await ArticleModel.findById(req.query.id);
    if (!Article)
      return res.status(400).json({
        status: "error",
        message: "Article Not Found",
      });
    console.log(Article);
    const TranslatedArticle = await tranlation;
    return res.status(200).json(TranslatedArticle);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
