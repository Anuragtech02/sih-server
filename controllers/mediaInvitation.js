import MediaInvitationModel from "../models/MediaInvitation.model.js";
import { v4 as uuid } from "uuid";

export async function createMediaInvitation(req, res) {
  try {
    const MediaInvitation = await MediaInvitationModel.create({
      ...req.body,
      _id: `${uuid().replace(/-/g, "_")}`,
    });
    return res.status(201).json({
      status: "success",
      data: MediaInvitation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateMediaInvitation(req, res) {
  if (!req.query.id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  try {
    const MediaInvitation = await MediaInvitationModel.findByIdAndUpdate(
      req.query.id,
      {
        ...req.body,
        updatedAt: new Date().toISOString(),
      }
    );
    return res.status(200).json(MediaInvitation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
