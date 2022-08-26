import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    gender: { type: String, required: true },
    pibs: { type: Array, required: true },
    interests: { type: Array, required: false },
    avatar: { type: String, required: true }, // CDN Img URI
    userType: { type: String, required: true }, 
    savedArticles: { type: Array, required: false }, // array of articleIds
    likedArticles: { type: Array, required: false }, // array of articleIds
    rewards: { type: Array, required: false },
    rewardPoints: { type: Number, required: false }, // number of rewardPoints
    fcmToken: { type: String, required: false },
    ministries: { type: Array, required: false },
    region: { type: Array, required: false },
    notifications: [{
      _id : { type: String, required: true },
      status:{ type: String, required: true }    // read or unread or sent
    }],
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
    updatedAt: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  { collection: "users" }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
