import prisma from "../../../config/database";
import { CreateSeatDto } from "../../../dto/create-seat";

export const createSeate=async(data:CreateSeatDto)=>{

const bus=await prisma.bus.findUnique({
    where:{
        id:data.busId
    },
    select:{
        id:true,
        name:true
    }
});

if(!bus){
    throw new Error("Bus does not exist");
}

const seat=await prisma.seat.create({
    data:{
      busId:data.busId,
      seatNumber:data.seatNumber,
      seatType:data.seatType  
    }
});

return seat;

}

export const bulkCreateSeats=async(data:CreateSeatDto)=>{

const allseats=await prisma.seat.findMany({
    where:{
        busId:data.busId
    },
    select:{
        seatNumber:true
    }
})

const exists=allseats.some(seat=>seat.seatNumber===data.seatNumber);
if(exists){
    throw new Error("seat already exists")
}
const seat=await prisma.seat.createMany({
    data:{
    seatNumber:data.seatNumber,
    seatType:data.seatType,
    busId:data.busId
    },});


    return seat;
}

export const getAllSeats=async()=>{
    const seats=await prisma.seat.findMany({
        select:{
            id:true,
            busId:true,
            seatNumber:true,
            seatType:true,
            bus:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })
}

export const getSeatById=async(seatId:string,busId:string)=>{
    const seat=await prisma.seat.findFirst({
        where:{
            id:seatId,
            busId:busId
        },
        select:{
            id:true,
            busId:true,
            seatNumber:true,
            seatType:true
        }
    })
    if(!seat){
        throw new Error("seat does not exists")
    }
return seat;
}

export const getSeatsByBusId=async(busId:string)=>{
    const seats=await prisma.seat.findMany({
        where:{
            busId:busId,
            isActive:true
        },
        select:{
            id:true,
            busId:true,
            seatNumber:true,
            seatType:true
        }
    });

if(!seats){
    throw new Error("no seats exists for this bus");
}
}

