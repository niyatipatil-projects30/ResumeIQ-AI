import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vzzesvhaduprsptnrksz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6emVzdmhhZHVwcnNwdG5ya3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjY2NDgsImV4cCI6MjA5NjgwMjY0OH0.q787bjJ-JfWPIYdqUtHerWU-Y9epI0noQ1RU50q5k_8"

 export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;