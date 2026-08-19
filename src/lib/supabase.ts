import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://tgpdcdcgsdijujfmxuee.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_i_etA-ZBYEv94GHnx6h5RA_Mn1suz3j';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
