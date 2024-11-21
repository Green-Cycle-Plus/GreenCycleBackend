import Company from "../models/Company.js";
import CompanyWasteType from "../models/CompanyWasteType.js";
import WasteType from "../models/WasteType.js";

export const Index = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({
      success: true,
      message: "Companies",
      data: companies,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

import mongoose from "mongoose";

export const show = async (req, res) => {
  try {
    const { company_id } = req.params;

    // Validate company_id
    if (!company_id || !mongoose.Types.ObjectId.isValid(company_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing company Id" });
    }

    // Fetch the company
    const company = await Company.findById(company_id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    // Fetch company wastes with names
    const companyWastesWithNames = await CompanyWasteType.aggregate([
      {
        $match: { companyId: new mongoose.Types.ObjectId(company_id) },
      },
      {
        $lookup: {
          from: "wastetypes",
          localField: "wasteTypeId",
          foreignField: "_id",
          as: "wasteDetails",
        },
      },
      {
        $unwind: "$wasteDetails", // Flatten the array to make wasteDetails an object
      },
    ]);

    console.log(companyWastesWithNames);

    // Return the company and waste details in the response
    return res.status(200).json({
      success: true,
      company,
      wastes_categories: companyWastesWithNames.map((waste) => ({
        id: waste._id,
        wasteTypeId: waste.wasteTypeId,
        wasteName: waste.wasteDetails.name,
        min_weight: waste.min_weight,
        amount: waste.amount,
        description: waste.description,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "An error occurred: " + error.message });
  }
};

export const getNearby = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    const radiusInMeters = radius * 1000;

    const companies = await Company.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: radiusInMeters,
          spherical: true,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Companies near you.",
      data: companies,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const register = async (req, res) => {
  const {
    companyId,
    companyName,
    email,
    phoneNumber,
    physicalAddress,
    lat,
    lon,
    companyLogo,
    licenseDocument,
    wasteTypeId,
    min_weight,
    amount,
    description,
  } = req.body;

  //Insert to DB Here
  try {
    const company = new Company({
      companyId: companyId,
      companyName: companyName,
      email: email,
      phoneNumber: phoneNumber,
      physicalAddress: physicalAddress,
      companyLogo: companyLogo,
      licenseDocument: licenseDocument,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });

    await company.save();

    const companyWaste = new CompanyWasteType({
      companyId: company._id,
      wasteTypeId: wasteTypeId,
      min_weight: min_weight,
      amount: amount,
      description: description,
    });

    await companyWaste.save();

    const selectedWaste = await WasteType.findById(wasteTypeId);

    const wasteInfo = {
      companyId: company._id,
      wasteTypeId: wasteTypeId,
      min_weight: min_weight,
      amount: amount,
      description: description,
      wasteName: selectedWaste.name,
    };

    console.log(wasteInfo);

    const data = {
      company: company,
      primary_waste_type: wasteInfo,
    };

    return res.status(200).json({
      success: true,
      message: "Company Registration successful.",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const addWasteCategory = async (req, res) => {
  const { companyId, wasteTypeId, min_weight, amount, description } = req.body;
  try {
    const wasteCategory = await CompanyWasteType.create({
      companyId,
      wasteTypeId,
      min_weight,
      amount,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "Category addeded",
      data: wasteCategory,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
