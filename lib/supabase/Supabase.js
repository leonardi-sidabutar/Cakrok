import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwmqhxvihwxbkddnfcal.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bXFoeHZpaHd4YmtkZG5mY2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTMyNzEsImV4cCI6MjA4NjM2OTI3MX0.9P8Y3Ez1RH9qo1DztTAn5-80wq31zRXzIpwn8ASSPt4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
