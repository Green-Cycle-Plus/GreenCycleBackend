import { Router } from "express";
import {
  addWasteCategory,
  getNearby,
  Index,
  register,
} from "../app/controllers/CompanyController.js";
import { validateRegister } from "../app/validators/createCompanyValidation.js";
import { validateCompanyWasteCategory } from "../app/validators/company/addWasteCategoryValidator.js";

const router = Router();

export const companyRoute = () => {
  router.get("/", Index);
  router.get("/nearby", getNearby);
  router.post("/create", validateRegister, register);
  router.post(
    "/add-waste-category",
    validateCompanyWasteCategory,
    addWasteCategory
  );

  return router;
};
