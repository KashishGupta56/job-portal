import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fkjlqlfemqgbtrorxxiv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZramxxbGZlbXFnYnRyb3J4eGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNjkxNTMsImV4cCI6MjA5MDk0NTE1M30.s8WMNTGAhHBExB9uOoFmEgyxWXv6d4pZSa1FFXUgcxo' // yahan paste karo

export const supabase = createClient(supabaseUrl, supabaseKey)