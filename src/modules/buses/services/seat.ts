import { Prisma } from "@prisma/client";
import prisma from "../../../config/database";
import { BulkCreateSeatsDto,CreateSeatDto } from "../../../dto/create-seat";

export interface BulkCreateSeatsResult {
  inserted: number;
  skipped: number;
}

export class SeatConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SeatConflictError";
  }
}

export class BusNotFoundError extends Error {
  constructor(busId: string) {
    super(`Bus ${busId} does not exist`);
    this.name = "BusNotFoundError";
  }
}


export async function bulkCreateSeats(
  seats: BulkCreateSeatsDto
): Promise<BulkCreateSeatsResult> {
  const busId = seats[0].busId;

  const bus = await prisma.bus.findUnique({
    where: { id: busId },
    select: { id: true, isActive: true },
  });
  if (!bus) throw new BusNotFoundError(busId);
  if (!bus.isActive) throw new BusNotFoundError(busId); // or a distinct error if you prefer


  const existing = await prisma.seat.findMany({
    where: {
      busId,
      seatNumber: { in: seats.map((s) => s.seatNumber) },
    },
    select: { seatNumber: true },
  });
  const existingNumbers = new Set(existing.map((s) => s.seatNumber));
  const toInsert = seats.filter((s) => !existingNumbers.has(s.seatNumber));

  if (toInsert.length === 0) {
    return { inserted: 0, skipped: seats.length };
  }

 
  try {
    const result = await prisma.seat.createMany({
      data: toInsert,
      skipDuplicates: true,
    });

    return {
      inserted: result.count,
      skipped: seats.length - result.count,
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new SeatConflictError("One or more seats already exist for this bus");
      }
      if (err.code === "P2003") {
        throw new BusNotFoundError(busId);
      }
    }
    throw err;
  }
}
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
    });
    return seats;
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

