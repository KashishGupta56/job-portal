import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnabzkttrsxcmokpngzb.supabase.co'
const supabaseKey = 'sb_publishable_WSDfOZ6D6QMSL0z1Q8rq-w_HWldG6mC'

export const supabase = createClient(supabaseUrl, supabaseKey)