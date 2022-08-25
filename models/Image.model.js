import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  { collection: "images" }
);

const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;
