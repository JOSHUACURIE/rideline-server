import { Router } from "express";

import { createBusController,getAllBuses,getBusById } from "../controllers/bus.controller";
import { createBusSchema } from "../../../validators/bus.validators";
import { validate } from "../../../middlewares/validate";
const router = Router();

router.post(
  "/create",
  validate(createBusSchema),
  createBusController
);

router.get("/all",getAllBuses);
router.get("/:id",getBusById);

export default router;