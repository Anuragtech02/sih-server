import express from "express";
import LiveVideoModel from "../models/Live.model.js";
import { v4 as uuid } from "uuid";

export const getImage = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({
      status: "error",
      message: "Id is required!",
    });
  }

  try {
    const contact = req.query.contact;
    const user = await UserModel.findOne({ contact });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }
    const notifications = user.notifications;

    return res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//done
export const createLiveVideo = async (req, res) => {
  if (!req.body.videoUrl) {
    return res.status(400).json({
      status: "error",
      message: "Video URL is required",
    });
  }
  try {
    const Video = await LiveVideoModel.create({
      _id: uuid(),
      title: req.body.title,
      videoUrl: req.body.videoUrl,
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json(Video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//done
export const getAllLiveVideos = async (req, res) => {
  try {
    const liveVideo = await LiveVideoModel.find();

    return res.status(200).json(liveVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
