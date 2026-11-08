import { Request,Response,NextFunction } from "express";
import { CreateBusDTO } from "../../../dto/create-bus";
import * as busService from '../services/bus.service';import { success } from "zod";
;

export const createBusController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const busData:CreateBusDTO=req.body;

        const bus= await busService.createBus(busData);

        res.status(201).json({
            success:true,
            message:"Bus created successfully",
            data:bus
        })
    } catch (error) {
        next(error)
    }
}
