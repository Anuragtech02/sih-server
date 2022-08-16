import express from "express";
import { UserModel } from "../models/user";
import { NotificationModel } from "../models/notifications";
import { v4 as uuid } from "uuid";

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
