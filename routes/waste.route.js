import { Router } from "express";
import { createWaste } from "../app/controllers/WasteController.js";

const router = Router();

export const wasteRoute = () => {
  router.post("/create", createWaste);

  return router;
};
