import { z } from "zod";

export const createBusSchema = z.object({
  registrationNumber: z.string().min(2).max(20),

  name: z.string().optional(),

  busType: z.enum([
    "STANDARD",
    "EXECUTIVE",
    "LUXURY",
    "VIP"
  ]),

  totalSeats: z.number().int().positive(),

  amenities: z.array(z.string())
});