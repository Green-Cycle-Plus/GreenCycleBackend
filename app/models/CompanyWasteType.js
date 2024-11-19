import { Schema as _Schema, model } from "mongoose";

const CompanyWasteCategorySchema = new _Schema(
  {
    companyId: {
      type: _Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    wasteTypeId: {
      type: _Schema.Types.ObjectId,
      required: true,
      ref: "WasteType",
    },

    min_weight: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: false,
      default: null, // Explicitly set a default of null
    },
  },
  { timestamps: true }
);

export default model("CompanyWasteCategory", CompanyWasteCategorySchema);
