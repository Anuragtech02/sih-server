import express from "express";
import ImageModel from "../models/Image.model.js";
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

export const createImage = async (req, res) => {
  if (!req.body.title || !req.body.body || !req.body.status) {
    return res.status(400).json({
      status: "error",
      message: "Title, body and status are required",
    });
  }
  try {
    const notification = await NotificationModel.create({
      _id: uuid(),
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      createdAt: new Date().toISOString(),
      publishedBy: {
        id: req.user._id,
        userType: req.user.userType,
        _id: false,
      },
    });
    return res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find().limit(10);

    return res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
