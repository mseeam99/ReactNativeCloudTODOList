import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import React from "react";
import axios from 'axios';

export default function Register({ navigation }) {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const API_KEY = 'AIzaSyAbp0mianqNX9gd3uJoBYkem9PROHlsG0U';

  async function registerFunction() {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const EMAIL = res.data.email;
      navigation.navigate('InsidePage', { currentUserEMAIL: EMAIL });
    } catch (error) {
      Alert.alert('Try again !');
      onChangeName('');
      onChangeEmail('');
      onChangePassword('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.label}>Enter Your Name</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>

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
        <Button title="Register" color="black" onPress={registerFunction} />
      </View>

      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Already have an Account? </Text>
        <View style={styles.registerButton}>
          <Button title="Login" color="black" onPress={() => navigation.navigate('Login')} />
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
