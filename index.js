import { apiRoutes } from "./routes/api.js";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { generateApiKey } from "./utils/helper.js";

const isDevelopment = process.env.DEV_MODE === "development";

const corsOptions = isDevelopment
  ? { origin: "*" } // Allow all origins for testing
  : { origin: "https://greencycleplus.com" }; // Restrict to your production frontend

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connnected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(express.json());

app.use(cors(corsOptions)); // Apply CORS settings
app.options("*", cors(corsOptions)); // Preflight requests

app.use(helmet());
app.use(morgan("common"));

//ROuute Registered Here.
app.use("/api", apiRoutes());

app.post("/api/generate-key", async (req, res) => {
  const { createdBy } = req.body;

  if (!createdBy) {
    return res
      .status(400)
      .json({ success: false, message: "CreatedBy is required." });
  }

  try {
    const newKey = await generateApiKey(createdBy);
    res.status(201).json({ success: true, apiKey: newKey });
  } catch (err) {
    console.error("Key generation error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.listen(8800, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port 8800`)
});
