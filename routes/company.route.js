import { Router } from "express";
import {
  addWasteCategory,
  companyGroupByCategory,
  getNearby,
  Index,
  register,
  show,
} from "../app/controllers/CompanyController.js";
import { validateRegister } from "../app/validators/createCompanyValidation.js";
import { validateCompanyWasteCategory } from "../app/validators/company/addWasteCategoryValidator.js";

const router = Router();

export const companyRoute = () => {
  router.get("/", Index);
  router.get("/waste-types", companyGroupByCategory);
  router.get("/nearby", getNearby);
  router.post("/create", validateRegister, register);
  router.get("/show/:company_id", show);
  router.post(
    "/add-waste-category",
    validateCompanyWasteCategory,
    addWasteCategory
  );

  return router;
};
