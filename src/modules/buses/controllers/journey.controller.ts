import { Request,Response,NextFunction } from "express";
import * as journeyService from '../services/journery.service';
import { CreateJourneyDTO } from "../../../dto/journey-dto";

export const CreateJourney=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const journeyData:CreateJourneyDTO=req.body;

        const data=await journeyService.CreateJourney(journeyData);

        return res.status(201).json({
            sucess:true,
            message:"journey created succesfully",
            data
        })

    } catch (error) {
        next(error)
    }
}

export const getAllJourneys=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const journeys=await journeyService.getAllJourneys();
        return res.status(200).json({
            success:true,
            message:"All journeys have been fetched succesfully",
            data:journeys
        })
    } catch (error) {
        next(error)
    }
}
export const getJourneyById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id;
        const data=await journeyService.getJourneyById(id as any);
        return res.status(200).json({
            success:true,
            message:"journey fetched successfully",
            data
        })
    } catch (error) {
        next(error);
        
    }
}