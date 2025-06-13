import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Model", modelSchema);
