import { Request,Response,NextFunction } from "express";
import * as routesService from '../services/routes.service';
import { CreateRouteDto } from "../../../dto/create-route";


export const createRoute=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
const routesData:CreateRouteDto=req.body;

const routes=await routesService.createRoute(routesData);
return res.status(200).json({
success:true,
message:"Route added sucesfully",
data:routes
});
    } catch (error) {
        next(error);
        
    }
}
export const bulkAddRoutes=async(req:Request,res:Response,next:NextFunction)=>{

try {
    const RoutesData:CreateRouteDto=req.body;

    const routes=await routesService.bulkAddRoutes(RoutesData);

    return res.status(201).json({
        success:true,
        message:"routes added successfuly",
        data:routes
    })
    
} catch (error) {
    next(error)
    
}}

export const getAllRoutes=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data=await routesService.getAllRoutes();
        res.status(200).json({
            success:true,
            message:"all routes fetched successfully",
            data
        })
    } catch (error) {
        next(error);
        
    }

}

export const getRouteById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const routeId=req.params.id;

        const route= await routesService.getRouteById(routeId as any)
    } catch (error) {
        next(error)
    }
}

module.exports={
    createRoute,
    bulkAddRoutes,
    getAllRoutes,
    getRouteById
}