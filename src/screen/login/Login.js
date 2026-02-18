import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import { supabase } from '../../../lib/supabase/Supabase'
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      console.log('Login Failed', error.message)
    } else {
      console.log('Success', 'Login berhasil 🎉')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/splash-icon.png')} style={styles.logo} />
      <View style={styles.wrap}>
      <Text style={styles.title}>Selamat Datang Di Aplikasi Cashier Cakrok, Harap Login!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title={loading ? 'Loading...' : 'Masuk'}
        onPress={handleLogin}
        disabled={loading}
        color={'#0099b3'}
      />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#fff',
    alignItems:'center'
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    color:'#333'
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 50,
    borderColor:'#ff6817'
  },
  wrap:{
    width:500
  },
  logo:{
    width:100,
    height:100,
    marginBottom:20,
    borderRadius:10
  }
})
