
import prisma from "../../../config/database";
import { CreateRouteDto } from "../../../dto/create-route";


export const createRoute=async(data:CreateRouteDto)=>{
    const route=await prisma.route.findFirst({
        where:{
            origin:data.origin,
            destination:data.destination
        }
    });

if(route){
    throw new Error("route already exists");
}

const newRoute=await prisma.route.create({
    data:{
        origin:data.origin,
        destination:data.destination,
        distanceKm:data.distanceKm,
        estimatedDurationMinutes:data.estimatedDurationMinutes
    }
});

return newRoute;
}

export const bulkAddRoutes=async(data:CreateRouteDto)=>{
    const routes=await prisma.route.findMany({
        select:{
            origin:true,
            destination:true
        }
    });
const routeExists=routes.some(route=>route.destination===data.destination && route.origin===data.origin);
if(routeExists){
    throw new Error("A route already exists")
};

const bulkRoutes=await prisma.route.createMany({
    data:{
        origin:data.origin,
        destination:data.destination,
        distanceKm:data.distanceKm,
        estimatedDurationMinutes:data.estimatedDurationMinutes
    }
});

return bulkRoutes;
}

export const getRouteById=async(routeId:string)=>{
    const route=await prisma.route.findUnique({
        where:{
            id:routeId
        },
        select:{
            id:true,
            origin:true,
            destination:true,
            distanceKm:true,
            estimatedDurationMinutes:true

        }
    });

    if(!route){
        throw new Error("route does not exists")
    }

    return route;
}

export const getAllRoutes=async()=>{
    const routes=await prisma.route.findMany({
         select:{
            id:true,
            origin:true,
            destination:true,
            distanceKm:true,
            estimatedDurationMinutes:true

        }
    });

    if(!routes){
        throw new Error("no route found")
    }

    return routes;
}