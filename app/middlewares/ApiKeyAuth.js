import ApiKey from "../models/ApiKey.js";

export const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res
      .status(401)
      .json({ success: false, message: "API key is missing." });
  }

  try {
    const keyExists = await ApiKey.findOne({ key: apiKey });

    if (!keyExists) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid API key." });
    }

    next();
  } catch (err) {
    console.error("API key validation error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
