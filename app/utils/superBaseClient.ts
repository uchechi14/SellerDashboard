import { createClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, 
     {
        auth: {
          persistSession: true,  //  Ensures session persists across reloads
          autoRefreshToken: true,
            detectSessionInUrl: true,
        },}
);