import { validate } from "../../../middlewares/validate";
import * as ctrl from '../controllers/journey.controller';
import { Router } from "express";
import { JourneySchema } from "../../../dto/journey-dto";
const router=Router();

router.post("/create",validate(JourneySchema),ctrl.CreateJourney);
router.get("/all",ctrl.getAllJourneys);
router.get("/:id",ctrl.getJourneyById);

export default router;