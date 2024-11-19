import crypto from "crypto";
import ApiKey from "../app/models/ApiKey.js";

export const generateApiKey = async (createdBy) => {
  const key = crypto.randomBytes(32).toString("hex");

  const apiKey = new ApiKey({
    key,
  });

  await apiKey.save();

  return key;
};
