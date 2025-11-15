import { z } from "zod";
import validator from "validator";

export const schemaFormLogin = z.object({
    username: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }).transform((username) => validator.escape(username)),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }).refine((password) => validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }), {
        message: "Password must be strong.",
    }),
});