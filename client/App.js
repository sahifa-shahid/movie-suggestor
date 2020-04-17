import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';

import LandingPage from './landingPage';
import FavMovies from './favMovies';
import Navigation from './navigation'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'ReemKufi-Regular': require('./assets/fonts/ReemKufi-Regular.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="FavMovies" component={FavMovies} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
})