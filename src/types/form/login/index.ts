import { z } from "zod";
import { schemaFormLogin } from "@/utilities/schema/form/login";

type Payload = {
    username: string;
    role: string;
    exp: number;
    iat: number;
}

export interface ResponsePaload {
    authenticated: boolean;
    user?: Payload
}

export type FormSchemaLogin = z.infer<typeof schemaFormLogin>;