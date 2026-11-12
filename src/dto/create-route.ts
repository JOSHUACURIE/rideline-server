import {z} from 'zod';
import { ostring } from 'zod/v3';

export const RouteSchema=z.object({
    origin:z.string(),
    destination:z.string(),
    distanceKm:z.number().int().positive(),
    estimatedDurationMinutes:z.number().int().positive()
})

export type CreateRouteDto=z.infer<typeof RouteSchema>