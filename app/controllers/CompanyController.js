import Company from "../models/Company.js";
import CompanyWasteType from "../models/CompanyWasteType.js";

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

    company.save();

    return res.status(200).json({
      success: true,
      message: "Company Registration successful.",
      data: company,
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
