import { Request,Response,NextFunction } from "express";
import { CreateSeatDto,BulkCreateSeatsDto } from "../../../dto/create-seat";
import * as seatService from '../services/seat'
import { success } from "zod";

export const createSeat=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const seatData:CreateSeatDto=req.body;

        const seat=await seatService.createSeate(seatData);

        return res.status(201).json({
            success:true,
            message:"seat added succesfully",
            seat
        });
    } catch (error) {
        next(error);
        
    }

}
export const bulkCreateSeats=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const seats:BulkCreateSeatsDto=req.body;

        const seatData=await seatService.bulkCreateSeats(seats);
        return res.status(201).json({
            success:true,
            message:"seats created successfully",
            data:seatData
        })
    } catch (error) {
     next(error);      
    }
}
export const getAllSeats=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const seats=await seatService.getAllSeats();
    return res.status(200).json({
        success:true,
        message:"seats fetched successfully",
        data:seats
    })
    
} catch (error) {

    next(error);
    
}
}
export const getSeatById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {seatId,busId}=req.query;
        const seat=await seatService.getSeatById(seatId as any,busId as any);
        return res.status(200).json({
            success:true,
            message:"seat fetched succesfully",
            data:seat
        })
    } catch (error) {
        next(error);
        
    }

}
export const getSeatsByBusId=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const busId=req.params.id;
        const seat=await seatService.getSeatsByBusId(busId as any);
        return res.status(200).json({
            success:true,
            message:"seat fetched succesfully",
            data:seat
        })
    } catch (error) {
        next(error);
        
    }
}