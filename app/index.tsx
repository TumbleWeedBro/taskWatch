import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'


const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password)
    } catch (error: any) {
      console.log(error)
      alert('Sign up failed: ' + error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.textInput} placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.textInput} placeholder="password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.text}>Make Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Match the home screen dark background
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 40,
    color: '#f0e4e4', // Match the rest of the application's text color
  },
  textInput: {
    height: 50,
    width: '90%',
    backgroundColor: '#1e1e1e', // Match the card components background
    borderColor: '#333333', // Dark border 
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#f0e4e4', // Match text color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  button: {
    width: '90%',
    marginVertical: 15,
    backgroundColor: '#1e1e1e', // Match card components
    borderColor: '#4caf50', // Highlight border for actions like in the theme logic (optional, but keep it clean #1e1e1e)
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    color: '#f0e4e4',
    fontSize: 18,
    fontWeight: 'bold',
  }
});