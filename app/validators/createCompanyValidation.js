import { body, validationResult } from "express-validator";
import Company from "../models/Company.js";
import WasteType from "../models/WasteType.js";
import CompanyWasteType from "../models/CompanyWasteType.js";

export const validateRegister = [
  body("companyId")
    .isNumeric()
    .withMessage("Company ID must be a number.")
    .notEmpty()
    .withMessage("Company ID is required.")
    .custom(async (value) => {
      try {
        const company = await Company.findOne({
          companyId: value,
        });
        if (company) {
          throw new Error("Company ID already exists.");
        }
      } catch (err) {
        throw new Error(err.message);
        // return res.status(500).json({ success: false, error: err.message });
      }
    }),
  body("companyName")
    .isString()
    .withMessage("Company Name must be a string.")
    .notEmpty()
    .withMessage("Company Name is required.")
    .isLength({ min: 3 })
    .withMessage("Company Name must be at least 3 characters long."),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email is required.")
    .custom(async (value) => {
      const company = await Company.findOne({
        email: value,
      });
      if (company) {
        throw new Error("Company email already exists.");
      }
    }),
  body("phoneNumber")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be 10-15 digits.")
    .notEmpty()
    .withMessage("Phone number is required.")
    .custom(async (value) => {
      try {
        const company = await Company.findOne({
          phoneNumber: value,
        });
        if (company) {
          throw new Error("Company phone number already exists.");
        }
      } catch (err) {
        throw new Error(err.message);
        // return res.status(500).json({ success: false, error: err.message });
      }
    }),
  body("physicalAddress")
    .isString()
    .withMessage("Physical Address must be a string."),
  body("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a number between -90 and 90.")
    .notEmpty()
    .withMessage("Latitude is required."),
  body("lon")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a number between -180 and 180.")
    .notEmpty()
    .withMessage("Longitude is required."),
  body("companyLogo")
    .isURL()
    .withMessage("Company Logo must be a valid URL.")
    .optional({ nullable: true }),
  body("licenseDocument")
    .isURL()
    .withMessage("License Document must be a valid URL.")
    .notEmpty()
    .withMessage("License Document is required."),
  body("wasteTypeId")
    .notEmpty()
    .withMessage("WasteTypeId must be a number.")
    .custom(async (value, { req }) => {
      try {
        const wasteType = await WasteType.findById(value);
        if (!wasteType) {
          throw new Error("Invalid Waste Type ID.");
        }
      } catch (err) {
        console.error("Database error:", err.message);
        throw new Error("Database error: " + err.message);
      }
    }),
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
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
