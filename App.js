import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { supabase } from './lib/supabase/Supabase'
import LoginScreen from './src/screen/login/Login'
import HomeScreen from './src/screen/cashier/Cashier'
import { ActivityIndicator, View } from 'react-native'
import Slider from './src/screen/slideToPay'
import Print from './lib/printer/Print'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} session={session} />}
          </Stack.Screen>
        ) : (
          // <Stack.Screen name="Login" component={LoginScreen} />
          // <Stack.Screen name="Login" component={Slider} />
          <Stack.Screen name="Login" component={Print} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
