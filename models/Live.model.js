import mongoose from "mongoose";

const LiveVideoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    createdAt:{
        type: String,
        default: new Date().toISOString(),
    }
});

const LiveVideoModel = mongoose.model("LiveVideo", LiveVideoSchema);

export default LiveVideoModel;
