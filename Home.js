import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function HomeScreenWidget({ navigation }) { 
  return (
    <View style={styles.container}>
      <View style={styles.animationView}>
        <LottieView
          source={{ uri: 'https://lottie.host/9640d72a-7350-43b0-9d45-9c3a3cd94eb8/4maT1LhfhB.json' }}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>

      <View style={styles.innerView}>
        <Button 
          title="START" 
          color="black" 
          onPress={() => navigation.navigate('Login')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  animationView: {
    marginBottom: 20,
  },

  lottieAnimation: {
    width: 300,
    height: 300,
  },

  innerView: {
    width: 150,
    height: 50,
    backgroundColor: 'dodgerblue',
    borderRadius: 25, 
    justifyContent: 'center',
    padding: 5,
    marginTop: 10,
  },
});
