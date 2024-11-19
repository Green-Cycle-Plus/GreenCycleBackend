import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

import Company from "../../models/Company.js";
import WasteType from "../../models/WasteType.js";
import CompanyWasteType from "../../models/CompanyWasteType.js";

export const validateCompanyWasteCategory = [
  // Validate companyId: Ensure it's a number and exists in the DB
  body("companyId")
    .notEmpty()
    .withMessage("Company ID is required.")
    .custom(async (value) => {
      try {
        const company = await Company.findOne({
          _id: value,
        });
        if (!company) {
          throw new Error("Invalid company ID.");
        }
      } catch (err) {
        console.error("Database error:", err.message);
        throw new Error("Database error: " + err.message);
      }
    }),

  // Validate wasteTypeId: Ensure it's a valid ObjectId and doesn't exist in the company already
  body("wasteTypeId")
    .notEmpty()
    .withMessage("WasteTypeId must be a number.")
    .custom(async (value, { req }) => {
      try {
        const wasteType = await WasteType.findById(value);
        const wasteExists = await CompanyWasteType.findOne({
          wasteTypeId: value,
          companyId: req.body.companyId,
        });

        if (!wasteType) {
          throw new Error("Invalid Waste Type ID.");
        }
        if (wasteExists) {
          throw new Error("Waste Category Already Added To Your Company.");
        }
      } catch (err) {
        console.error("Database error:", err.message);
        throw new Error("Database error: " + err.message);
      }
    }),

  // Validate weight: Ensure it's a number and not empty
  body("min_weight")
    .notEmpty()
    .withMessage("Min Weight is required.")
    .isNumeric()
    .withMessage("Min Weight must be a number."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isNumeric()
    .withMessage("Amount must be a number."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
