import { createClient } from "@supabase/supabase-js"

// Replace with your own project details
const SUPABASE_URL = "https://bwllkodhqrfuijhtucsf.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bGxrb2RocXJmdWlqaHR1Y3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NzMwNTQsImV4cCI6MjA3MjU0OTA1NH0.Tqc7Z5RyVBisjuI63J53Nn4OUcMB-41JuRs-ap6zIJU"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
