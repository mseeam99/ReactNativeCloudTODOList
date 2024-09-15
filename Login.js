import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import React from "react";
import axios from 'axios'; 

const API_KEY = 'AIzaSyAbp0mianqNX9gd3uJoBYkem9PROHlsG0U';  

export default function Login({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  async function loginFunction() {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const EMAIL = res.data.email;
      navigation.navigate('InsidePage',{ currentUserEMAIL: EMAIL });
    } catch (error) {
      Alert.alert('Error', 'Please try again!');  
      onChangeEmail('');
      onChangePassword('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.label}>Enter Your Email</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.innerView}>
        <Text style={styles.label}>Enter Your Password</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonStyle}>
        <Button title="Login" color="black" onPress={loginFunction} />
      </View>

      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Need to create an Account? </Text>
        <View style={styles.registerButton}>
          <Button title="Register" color="black" onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  innerView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  inputText: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonStyle: {
    borderRadius: 50,
    backgroundColor: 'dodgerblue',
    marginBottom: 20,
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    fontStyle: 'italic',
    paddingRight: 10,
  },
  registerButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
  },
});
