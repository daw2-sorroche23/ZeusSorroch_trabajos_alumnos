import { createClient } from '@supabase/supabase-js'
//Creando la conexión con supabase
const supabaseUrl = 'https://mriygusapxxtptlnntqq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaXlndXNhcHh4dHB0bG5udHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MzMsImV4cCI6MTk5Mjc1MjYzM30.t0tEtIBPuf7ufhCknez5IEDaGA985pCIZqqzYpLFVUc' 

//exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
