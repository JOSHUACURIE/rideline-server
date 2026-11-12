import { Router } from "express";

import { validate } from "../../../middlewares/validate";
import { RouteSchema } from "../../../dto/create-route";
import * as ctrl from '../controllers/routes.controller'
const router=Router();

router.post("/create/single",validate(RouteSchema),ctrl.createRoute);

router.get("/all",ctrl.getAllRoutes);

router.get("/:id",ctrl.getRouteById);

router.post("/create/bulk",ctrl.bulkAddRoutes);

export default router; 