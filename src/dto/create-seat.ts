import {z} from 'zod'
import { TypeOf } from 'zod/v3';

export const SeatSchema=z.object({
    busId:z.string(),
    seatNumber:z.string(),
    seatType:z.enum(["REGULAR","VIP","ACCESSIBLE"])
});

export type CreateSeatDto=z.infer<typeof SeatSchema>;