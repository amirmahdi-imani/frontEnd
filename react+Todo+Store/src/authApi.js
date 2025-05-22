import axios from 'axios';
import { createClient } from '@supabase/supabase-js';



const SUPABASE_URL = 'https://yobxppcjvrzajtnqadql.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvYnhwcGNqdnJ6YWp0bnFhZHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDAwNTMsImV4cCI6MjA2MjQ3NjA1M30.8Kbz5h-qVbLMVFqG7rlYSf_0J-fruRw051ojdWg9NFc';

const supabaseClient = axios.create({
    baseURL: `${SUPABASE_URL}/auth/v1`,
    headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const signUp = async(email, password) => {
    const { data } = await supabaseClient.post('/signup', {
        email,
        password,
    });
    return data;
};


export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)