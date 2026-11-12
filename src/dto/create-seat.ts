import { z } from "zod";
import { SeatType } from "@prisma/client";

export const CreateSeatSchema = z.object({
  busId: z.string().uuid(),
  seatNumber: z
    .string()
    .trim()
    .min(1)
    .max(10)
    .regex(/^[A-Z]\d{1,2}$/),
  seatType: z.nativeEnum(SeatType),
});

export const BulkCreateSeatsSchema = z
  .array(CreateSeatSchema)
  .min(1)
  .max(500)
  .refine((seats) => new Set(seats.map((s) => s.seatNumber)).size === seats.length, {
    message: "Duplicate seatNumber values within the batch",
  })
  .refine((seats) => new Set(seats.map((s) => s.busId)).size === 1, {
    message: "All seats in a batch must belong to the same busId",
  });

export type CreateSeatDto = z.infer<typeof CreateSeatSchema>;
export type BulkCreateSeatsDto = z.infer<typeof BulkCreateSeatsSchema>;