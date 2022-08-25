import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true }, // read or unread or sent
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
    publishedBy: {
      id: { type: String, required: true },
      userType: { type: String, required: true },
      _id: false,
    },
  },
  { collection: "notifications" }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;
