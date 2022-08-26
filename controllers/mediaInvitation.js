import MediaInvitationModel from "../models/MediaInvitation.model.js";
import { v4 as uuid } from "uuid";
import { pibs } from "../utils/index.js";

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

export async function getMediaInvitationPIB(req, res) {
  try {
    if (!req.query.pib) {
      return res.status(400).json({
        status: "error",
        message: "Invalid PIB",
      });
    }

    const response = await parse(
      `https://pib.gov.in/RssMain.aspx?ModId=10&Lang=1&Regid=${
        pibs[req.query.pib]
      }`
    );
    const data = JSON.parse(JSON.stringify(response, null, 3));

    return res.status(200).json(data.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
}
