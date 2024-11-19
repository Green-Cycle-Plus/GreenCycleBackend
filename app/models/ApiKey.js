import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String, // For example, user ID or service name
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ApiKey", ApiKeySchema);
