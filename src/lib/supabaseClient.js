import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfyrtanuckeblxpkfnfb.supabase.co';
const supabaseKey = 'sb_publishable_HbHB77Kp0cpc4wR2-7xFNA_OLK9tiZ6';

export const supabase = createClient(supabaseUrl, supabaseKey);