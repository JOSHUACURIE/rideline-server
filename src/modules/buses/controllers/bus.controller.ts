import { Request,Response,NextFunction } from "express";
import { CreateBusDTO } from "../../../dto/create-bus";
import * as busService from '../services/bus.service';import { success } from "zod";
import ne from "zod/v4/locales/ne.js";
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


export const getAllBuses=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const busData=await busService.getAllBuses();

console.log("Buses fetched successfully")
return res.status(200).json({
    success:true,
    message:"buses fetched successfully",
    busData
})

    } catch (error) {
        next(error)
    }
}