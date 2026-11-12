import {z} from 'zod';

export const JourneySchema=z.object({
   routeId:z.string().uuid(),
   busId:z.string().uuid(),
   departureAt:z.coerce.date(),
   arrivalAt:z.coerce.date(),
   fareAmountMinor:z.number().int().positive(),
   currency:z.string()

});


export type CreateJourneyDTO=z.infer<typeof JourneySchema>;