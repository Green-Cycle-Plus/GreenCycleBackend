import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    companyId: {
      type: Number,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    physicalAddress: {
      type: String,
      required: false,
    },
    companyLogo: {
      type: String,
      required: false,
    },
    licenseDocument: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // Must always be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// 2dsphere index for geospatial queries
CompanySchema.index({ location: "2dsphere" });

export default model("Company", CompanySchema);
