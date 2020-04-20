import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';

import LandingPage from './landingPage';
import FavMovies from './favMovies';
import Navigation from './navigation'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

import * as firebase from 'firebase/app';

// // Optionally import the services that you want to use
// //import "firebase/auth";
// //import "firebase/database";
// //import "firebase/firestore";
// //import "firebase/functions";
// //import "firebase/storage";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAI5Dms1tTXc_vA5TTF6ZOwkom6lX_3GDs",
//     authDomain: "scout-2b10f.firebaseapp.com",
//     databaseURL: "https://scout-2b10f.firebaseio.com",
//     projectId: "scout-2b10f",
//     storageBucket: "scout-2b10f.appspot.com",
//     messagingSenderId: "62948149005",
//     appId: "1:62948149005:web:6d2b5aa5e34c4449771244",
//     measurementId: "G-V544T3KFJ1"

// };

// firebase.initializeApp(firebaseConfig);

function firebaseSignUp() {
  // firebase.auth().createUserWithEmailAndPassword("sahifashahid2626@gmail.com", "octapussy26!").catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
  console.log("hi")
}


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
    <TouchableOpacity onPress={() => firebaseSignUp() }style={{marginTop: 50}}><Text>Click to Login</Text></TouchableOpacity>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="LandingPage" component={LandingPage} />
    //     <Stack.Screen name="FavMovies" component={FavMovies} />
    //     <Stack.Screen name="Navigation" component={Navigation} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
})