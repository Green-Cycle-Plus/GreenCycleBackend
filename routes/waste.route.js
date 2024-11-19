import { Router } from "express";
import { createWaste, index } from "../app/controllers/WasteController.js";

const router = Router();

export const wasteRoute = () => {
  router.get("/", index);
  router.post("/create", createWaste);

  return router;
};
