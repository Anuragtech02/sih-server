import mongoose from "mongoose";

const MediaInvitationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    invitationDate: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: false },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    updatedAt: {
        type: String,
        default: new Date().toISOString(),
    },
  },
  { collection: "invitations" }
);

const MediaInvitationModel = mongoose.model("MediaModel", MediaInvitationSchema);

export default MediaInvitationModel;
