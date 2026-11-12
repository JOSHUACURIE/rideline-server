import da from "zod/v4/locales/da.js";
import prisma from "../../../config/database";
import { CreateBusDTO } from "../../../dto/create-bus";

export const createBus=async(data:CreateBusDTO)=>{
    const existingBus=await prisma.bus.findUnique({
        where:{
            registrationNumber:data.registrationNumber
        }
    });

    if(existingBus){
        throw new Error("Bus already exists")
    }


    const bus=await prisma.bus.create({
        data:{
            registrationNumber:data.registrationNumber,
            name:data.name,
            busType:data.busType,
            totalSeats:data.totalSeats,
            amenities:data.amenities
        }
    });

    return bus;
}

export const getAllBuses=async()=>{
    const bus=await prisma.bus.findMany({
        select:{
            id:true,
            name:true,
            registrationNumber:true,
            busType:true,
            totalSeats:true,
            amenities:true
        }
    })

    return bus;
}

export const getBusById=async(busId:string)=>{

    const bus= await prisma.bus.findUnique({
        where:{
            id:busId
        },
        select:{
            id:true,
            name:true,
            registrationNumber:true,
            totalSeats:true
        }
    });
    if(!bus){
        throw new Error("Bus does not exists")
    }


  return bus;

}