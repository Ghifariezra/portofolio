import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

export const supabase = () =>
    createBrowserClient(
        supabaseUrl!,
        supabaseKey!,
        { db: { schema: "portfolio" } }
    );
