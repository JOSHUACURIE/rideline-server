import { Router } from "express";

import { createBusController,getAllBuses } from "../controllers/bus.controller";
import { createBusSchema } from "../../../validators/bus.validators";
import { validate } from "../../../middlewares/validate";
const router = Router();

router.post(
  "/",
  validate(createBusSchema),
  createBusController
);

router.get("/",getAllBuses);

export default router;