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
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    companyLogo: {
      type: String,
      required: false,
    },
    licenseDocument: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Company", CompanySchema);
