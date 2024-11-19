import Company from "../models/Company.js";
import CompanyWasteType from "../models/CompanyWasteType.js";

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
    const company = await Company.create({
      companyId,
      companyName,
      email,
      phoneNumber,
      physicalAddress,
      lat,
      lon,
      companyLogo,
      licenseDocument,
    });

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
