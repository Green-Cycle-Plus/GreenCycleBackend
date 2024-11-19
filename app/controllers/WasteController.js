import { body, validationResult } from "express-validator";
import WasteType from "../models/WasteType.js";

export const index = async (req, res) => {
  try {
    const wastetype = await WasteType.find();
    return res.status(200).json({
      success: true,
      message: "All Waste Type",
      data: wastetype,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const createWaste = async (req, res) => {
  await Promise.all([
    body("name")
      .isString()
      .withMessage("Name of waste must be a string.")
      .notEmpty()
      .withMessage("Name of waste is required.")
      .custom(async (value) => {
        const existingName = await WasteType.findOne({
          where: { name: value },
        });
        if (existingName) {
          throw new Error("Waste type name already exists.");
        }
      })
      .run(req),
    body("image")
      .isURL()
      .withMessage("Image must be a valid URL.")
      .optional({ nullable: true })
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, image } = req.body;

  try {
    const wastetype = await WasteType.create({ name, image });
    return res.status(200).json({
      success: true,
      message: "New waste added successfully",
      data: wastetype,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
