import { Schema, model } from "mongoose";

const WasteTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("WasteType", WasteTypeSchema);
