import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';


// create supabase client
const supabase = createPagesBrowserClient();
export default supabase;