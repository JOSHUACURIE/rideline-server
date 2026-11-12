import tr from "zod/v4/locales/tr.js";
import prisma from "../../../config/database";
import { CreateBookingDTO } from "../../../dto/create-booking";

//transaction
export const createBooking=async(data:CreateBookingDTO)=>{
    return await prisma.$transaction(async(tx)=>{
const journey=await tx.journey.findUnique({
    where:{
        id:data.journeyId,
        
    },
//  select:{
//     id:true,
    
//  }
})

if(!journey){
    throw new Error("Journey does not exist")
}
const seatTaken=await tx.journeySeat.findFirst({
    where:{
        journeyId:data.journeyId,
        
    }
})






    })
}



export const getAllBookings=async()=>{
const bookings=await prisma.booking.findMany({
    select:{
        id:true,
        bookingReference:true,
        journeyId:true,
        passengerFirstName:true,
        passengerSecondName:true,
        passengerPhone:true,
        seatNumbers:true,
        status:true,
        journey:{
            select:{
                id:true,
                bus:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        }

    }
})

if(!bookings){
    throw new Error("No bookings found")
}

return bookings;
}

export const getBookingsByJourneyId=async(journeyId:string)=>{
    const journey=await prisma.journey.findFirst({
        where:{
            id:journeyId
        }
    })
if(!journey){
    throw new Error("journey does not exists")
}

const bookings=await prisma.booking.findMany({
    where:{
        journeyId:journeyId,
    },
    select:{
        id:true,
        bookingReference:true,
        passengerFirstName:true,
        passengerSecondName:true,
        status:true,
        payments:{
            select:{
                id:true,
                amountMinor:true
            }
        }
    
    }
});

if(!bookings){
    throw new Error("no bookings for this journey")
}

return bookings;
}