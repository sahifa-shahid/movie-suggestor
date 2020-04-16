import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';

import SignIn from './signIn'
import SignUp from './signUp'

export default function App() {
  let [fontsLoaded] = useFonts({
    'ReemKufi-Regular': require('./assets/fonts/ReemKufi-Regular.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
      <SignUp  />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  background: { 
    flex: 1,
  },
})