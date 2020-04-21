import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';

import LandingPage from './landingPage';
import FavMovies from './favMovies';
import Navigation from './navigation'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyAI5Dms1tTXc_vA5TTF6ZOwkom6lX_3GDs",
    authDomain: "scout-2b10f.firebaseapp.com",
    databaseURL: "https://scout-2b10f.firebaseio.com",
    projectId: "scout-2b10f",
    storageBucket: "scout-2b10f.appspot.com",
    messagingSenderId: "62948149005",
    appId: "1:62948149005:web:6d2b5aa5e34c4449771244",
    measurementId: "G-V544T3KFJ1"

};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("Logged In")
  } else {
    console.log("Logged Out")
  }
});

const db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});



export default function App() {
  const [loggedIn, setLoggedIn] = useState()

  useEffect(() => firebase.auth().onAuthStateChanged((user) => user ? setLoggedIn(true) : setLoggedIn(false)), [])
  let [fontsLoaded] = useFonts({
    'ReemKufi-Regular': require('./assets/fonts/ReemKufi-Regular.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf')
  });
  if (!fontsLoaded || loggedIn === undefined) {
    return <AppLoading />;
  }
  else {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn ? "Navigation" : "LandingPage"}>
    //     <Stack.Screen name="LandingPage" component={LandingPage} />
    //     <Stack.Screen name="FavMovies" component={FavMovies} />
    //     <Stack.Screen name="Navigation" component={Navigation} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <TouchableOpacity onPress={() => addStuff()} style={{marginTop: 100}}><Text>Click</Text></TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
})