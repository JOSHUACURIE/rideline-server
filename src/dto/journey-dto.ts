import {z} from 'zod';

export const JourneySchema=z.object({
   routeId:z.string(),
   busId:z.string(),
   departureAt:z.date(),
   arrivalAt:z.string(),
   fareAmountMinor:z.int().positive(),
   currency:z.string()

});
export interface JourneyResponse{
   id:string;
   routeId:string;
   busId:string;
   departureAt:string;
   arrivalAt:string;
   fareAmountMinor:string;
   currency:string;

}

export type CreateJourneyDTO=z.infer<typeof JourneySchema>;