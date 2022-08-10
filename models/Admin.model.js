import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    userType: { type: String, required: true }, // admin
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
