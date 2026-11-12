import {z} from 'zod';
const journeySchema=z.object({
    routeId:z.string(),
    busId:z.string(),
    departureAt:z.date(),
    arrivalAt:z.date(),
    currency:z.string(),
    fareAmountMinor:z.number()
})