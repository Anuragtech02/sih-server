import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true }, // slug is the url friendly version of the title
  content: { type: String, required: true }, // HTMLString, comes from the editor
  thumbnail: { type: String, required: true }, // CDN URI
  views: { type: Number, required: true }, // number of views
  likes: { type: Number, required: true }, // number of likes
  shares: { type: Number, required: true }, // number of shares
  savedBy: { type: Array, required: true }, // array of userIds
  categories: { type: Array, required: true },
  createdBy: {
    id: { type: String, required: true },
    userType: { type: String, required: true },
    _id: false,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

const ArticleModel = mongoose.model("Article", ArticleSchema);

export default ArticleModel;
