import { createClient } from "@supabase/supabase-js";






const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbHJlaHhqZ3V2Z3J5eXhmZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjU5NjYsImV4cCI6MjA2NDYwMTk2Nn0.hPdgUCT7fXOI--iKz0mYce51BN8-FoeUiOBX9b4JQIg';
export const supabase = createClient(
    'https://edlrehxjguvgryyxfepe.supabase.co',
    supabaseKey
)