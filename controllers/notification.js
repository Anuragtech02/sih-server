import express from "express";
import UserModel from "../models/User.model.js";
import NotificationModel from "../models/Notification.model.js";
import { v4 as uuid } from "uuid";
import admin from "firebase-admin";

export const getNotifications = async (req, res) => {
  if (!req.query.contact) {
    return res.status(400).json({
      status: "error",
      message: "Contact is required",
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

export const createNotification = async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({
      status: "error",
      message: "Title, body and status are required",
    });
  }
  const { title, body } = req.body;
  const tokens = await UserModel.find({}, { fcmToken: 1 });
    const tokensArray = tokens
      .map((token) => token.fcmToken)
      .filter((token) => token !== null && token !== undefined);
  try {
    const message = {
      notification: {
        ...req.body,
      },
      tokens:tokensArray,
    };
    // const notification = await NotificationModel.create({
    //   _id: uuid(),
    //   title: req.body.title,
    //   body: req.body.body,
    //   status: req.body.status,
    //   createdAt: new Date().toISOString(),
    //   publishedBy: {
    //     id: req.user._id,
    //     userType: req.user.userType,
    //     _id: false,
    //   },
    // });
    const response = await admin.messaging().sendMulticast(message);
    console.log(response.responses[0].error);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
