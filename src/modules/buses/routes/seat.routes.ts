import { Router } from "express";
import { SeatSchema } from "../../../dto/create-seat";
import { validate } from "../../../middlewares/validate";
const router=Router();
import * as ctrl from '../controllers/seat.controller';

router.post("/create/single",validate(SeatSchema),ctrl.createSeat);
router.post("/create/bulk",validate(SeatSchema),ctrl.bulkCreateSeats);
router.get("/:id",ctrl.getSeatById);
router.get("/all",ctrl.getAllSeats);
router.get("/:busId",ctrl.getSeatsByBusId);


export default router;