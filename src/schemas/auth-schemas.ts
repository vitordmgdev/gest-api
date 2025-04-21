import { z } from "zod";

export const verifyCredentialsSchema = z.object({
    username: z.string().min(3, {
        message: "Mínimo de 3 caracteres"
    }),
    email: z.string().email({
        message: "Você deve passar um email válido"
    })
}).strip();