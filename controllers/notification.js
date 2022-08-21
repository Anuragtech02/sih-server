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
  if (!req.body.title || !req.body.body || !req.body.status) {
    return res.status(400).json({
      status: "error",
      message: "Title, body and status are required",
    });
  }
  const { title, body } = req.body;
  try {
    const message = {
      notification: {
        ...req.body,
      },
      tokens: [
        "c-n6Rsg9SX2ziISDz-rDXP:APA91bEr9wxno3GXKZw1AS3a1A9bEEou8aWclKwuInE3bRZUWxYUBDQevSlRrLsEe3uzakolB_k3qkIoMV8bDr4ipcuOjaICdnUaWj0hkcn6ydxLV2_WREPxQ5Jm1nIzMoh9GJhUcSk_",
        "fF0kZlhFTq6Dz27G69SII-:APA91bEeKjxDsMcN8o7p06KMmqDyza_M5YRXavQ-TKu7WbKnBaYlGznZTuTfVpJ1g67IJyw72jWdflJyh3vwZBSR1uv3vS939U0DFHSqbk8XCs_EW-ircm5jTKePya__w-vNZMaSnGTZ",
        "ciBJpI-MRwm94xBTAsXLrl:APA91bG0El_8Lfu98Y1rFUqAA_FrqgywEfPv23zl8fiOzeSc1iqQeK_4obC3AUkcNO9tukpHlQ6nZqoA3GBZBLqLgoMJ5fs9WUA8Xrwwo6-4jht01lSgyLuCDvNf8DSc_hm_zc2XmFy1",
      ],
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
    console.log(response);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
