import {z} from 'zod';

export const createBookingSchema=z.object({
    bookingReference:z.string(),
    journeyId:z.string(),
    passengerFirstName:z.string(),
    passengerSecondName:z.string(),
    passengerPhone:z.string(),
    passengerEmail:z.string(),
    seatNumbers:z.array(z.string())
})

export type CreateBookingDTO=z.infer<typeof createBookingSchema>;