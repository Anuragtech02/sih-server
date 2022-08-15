import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    userType: { type: String, required: true }, // admin
    createdAt: { type: String, default: new Date().toISOString() },
    updatedAt: { type: String, default: new Date().toISOString() },
  },
  { collection: "admins" }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;
