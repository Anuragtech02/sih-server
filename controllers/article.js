import ArticleModel from "../models/Article.model.js";
import { v4 as uuid } from "uuid";
import UserModel from "../models/User.model.js";
import axios from "axios";
import xml2js from "xml2js";
import some from "rss-to-json";
import { createNotification } from "./notification.js";
import NotificationModel from "../models/Notification.model.js";

const { parse } = some;

export async function createArticle(req, res) {
  try {
    // console.log(req, res);
    console.log("Success");
    const Article = await ArticleModel.create({
      ...req.body,
      _id: `${uuid().replace(/-/g, "_")}`,
    });
    const translate = axios.post("https://translator-sih-2022.herokuapp.com/", {
      sentence: req.body.content.en,
      id: Article._id,
    });

    const tokens = await UserModel.find({}, { fcmToken: 1 });
    const message = {
      notification: {
        title: "New Press Release",
        body: Article.title,
        thumbnail: Article.thumbnail,
      },
      // tokens: [
      //   "c-n6Rsg9SX2ziISDz-rDXP:APA91bEr9wxno3GXKZw1AS3a1A9bEEou8aWclKwuInE3bRZUWxYUBDQevSlRrLsEe3uzakolB_k3qkIoMV8bDr4ipcuOjaICdnUaWj0hkcn6ydxLV2_WREPxQ5Jm1nIzMoh9GJhUcSk_",
      //   "fF0kZlhFTq6Dz27G69SII-:APA91bEeKjxDsMcN8o7p06KMmqDyza_M5YRXavQ-TKu7WbKnBaYlGznZTuTfVpJ1g67IJyw72jWdflJyh3vwZBSR1uv3vS939U0DFHSqbk8XCs_EW-ircm5jTKePya__w-vNZMaSnGTZ",
      //   "ciBJpI-MRwm94xBTAsXLrl:APA91bG0El_8Lfu98Y1rFUqAA_FrqgywEfPv23zl8fiOzeSc1iqQeK_4obC3AUkcNO9tukpHlQ6nZqoA3GBZBLqLgoMJ5fs9WUA8Xrwwo6-4jht01lSgyLuCDvNf8DSc_hm_zc2XmFy1",
      // ],
      tokens,
    };
    const notification = await NotificationModel.create({
      _id: uuid(),
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      createdAt: new Date().toISOString(),
      publishedBy: {
        id: "req.user._id",
        userType: req.user.userType,
        _id: false,
      },
    });
    const response = await admin.messaging().sendMulticast(message);
    console.log("Successfully sent message:", response);
    // createNotification(
    //   {
    //     title: "New Article Published",
    //     body: Article.title,
    //   },
    //   res
    // );
    return res.status(201).json({
      status: "success article created",
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

export const getArticlesFromRss = async (req, res) => {
  try {
    const feed = await parse(
      "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3"
    );
    const data = JSON.parse(JSON.stringify(feed, null, 3));
    return res.status(200).json(
      data.items?.map((item) => ({
        ...item,
        thumbnail:
          "https://ik.imagekit.io/sihassembly/sih-placeholder_cXgXA446y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661432719323",
      }))
    );
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
