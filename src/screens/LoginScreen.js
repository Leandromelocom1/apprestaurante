import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = response.data;
      // Armazene o token para futuras requisições
      // AsyncStorage.setItem('token', token); // Se usar AsyncStorage
      Alert.alert('Login successful');
      navigation.navigate('Menu');
    } catch (error) {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>FoodCart</Text>
        <Text style={styles.sloganText}>Special & Delicious Food</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="demo@gmail.com"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="**********"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={styles.checkboxText}>{rememberMe ? '[x]' : '[ ]'} Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Add forgot password logic here */ }}>
          <Text style={styles.forgotText}>Forgot ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 36,
    color: '#7ED321',
    fontWeight: 'bold',
  },
  sloganText: {
    fontSize: 16,
    color: '#ccc',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7ED321',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  checkboxText: {
    color: '#7ED321',
  },
  forgotText: {
    color: '#7ED321',
    fontSize: 16,
  },
  registerText: {
    color: '#7ED321',
    fontSize: 16,
  },
});

export default LoginScreen;
