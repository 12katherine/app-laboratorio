import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  logo: { type: String },
  formato: { type: String },
  interfaz: { type: String },
  temporal: { type: String },
});

export default mongoose.model("Color", ColorSchema);