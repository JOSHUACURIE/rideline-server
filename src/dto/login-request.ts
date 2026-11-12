import { z } from "zod";

export const loginSchema=z.object({
email:z.email(),
password:z.string().min(8,"password must be atleast 8 characters")
});


export type LoginRequest=z.infer<typeof loginSchema>