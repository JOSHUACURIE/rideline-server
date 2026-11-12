import { CreateJourneyDTO } from "../../../dto/journey-dto";
import prisma from "../../../config/database";
import { JourneyResponse } from "../../../dto/journey-dto";
import { da } from "zod/locales";

export const CreateJourney=async(data:CreateJourneyDTO)=>{
const journey=await prisma.journey.create({
    data:{
        routeId:data.routeId,
        busId:data.busId,
        departureAt:data.departureAt,
        arrivalAt:data.arrivalAt,
        currency:data.currency,
        fareAmountMinor:data.fareAmountMinor
    }
});

return journey;
}

export const getAllJourneys=async()=>{
    const journeys=await prisma.journey.findMany({
        select:{
            id:true,
            route:{
                select:{
                    id:true,
                    origin:true,
                    destination:true,
                    distanceKm:true,
                    estimatedDurationMinutes:true
                }                
            },
            departureAt:true,
            arrivalAt:true,
            fareAmountMinor:true
        }
    });

    return journeys;
}

export const getJourneyById=async(journeyId:string)=>{
 

    const journey=await prisma.journey.findUnique({
        where:{
            id:journeyId
        },
        select:{
          
            id:true,
            route:{
                select:{
                    id:true,
                    origin:true,
                    destination:true,
                    distanceKm:true,
                    estimatedDurationMinutes:true
                }                
            },
            departureAt:true,
            arrivalAt:true,
            fareAmountMinor:true
        
        }
    });


    if(!journey){
        throw new Error("failed to create journey");
    }

    return journey;
}