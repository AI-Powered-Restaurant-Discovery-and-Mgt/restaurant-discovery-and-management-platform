import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aieyitrjvuelhsfjxsuc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZXlpdHJqdnVlbGhzZmp4c3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3Mzk4NTUsImV4cCI6MjA1MjMxNTg1NX0.daUWpUhEN1f_rB9UYOnYJ6nG_eb7iLoNY7YTedb4x3E";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);