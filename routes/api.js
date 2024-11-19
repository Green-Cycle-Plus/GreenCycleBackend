import { Router } from "express";
import { companyRoute } from "./company.route.js";
import { wasteRoute } from "./waste.route.js";
import { apiKeyAuth } from "../app/middlewares/ApiKeyAuth.js";

const router = Router();

export const apiRoutes = () => {
  router.use("/company", apiKeyAuth, companyRoute());
  router.use("/waste-type", apiKeyAuth, wasteRoute());

  return router;
};
