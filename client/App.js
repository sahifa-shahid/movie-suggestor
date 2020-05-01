import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';

import LandingPage from './landingPage';
import FavMovies from './favMovies';
import Navigation from './navigation';
import SearchFavMovies from './searchFavMovies'
import Testing from './test'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {auth, db} from './firebaseHandler'

auth.onAuthStateChanged((user) => {
  if (user != null) {
    console.log("Logged In")
  } else {
    console.log("Logged Out")
  }
});

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState()
  const [accountActivated, setAccountActivated] = useState()

  function initialUserCheck(user) {
      db.collection("users").doc(user.uid).get().then(function(doc) {
      if (doc.data().movies.length !== 0) {
        setAccountActivated(true)
      } else {
        setAccountActivated(false)
      }
      setLoggedIn(true)
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  function loggedOut() {
    setAccountActivated(false)
    setLoggedIn(false)

  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => user ? initialUserCheck(user) : loggedOut())
  }, [])
  let [fontsLoaded] = useFonts({
    'ReemKufi-Regular': require('./assets/fonts/ReemKufi-Regular.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf')
  });
  if (!fontsLoaded || loggedIn === undefined || accountActivated === undefined) {
    return <AppLoading />;
  }
  else {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn && accountActivated ? "Navigation" : loggedIn && accountActivated === false ? "FavMovies" : "LandingPage"}>
        <Stack.Screen name="LandingPage" component={LandingPage}/>
        <Stack.Screen name="FavMovies" component={FavMovies} />
        <Stack.Screen name="Navigation" component={Navigation} initialParams={{recentlyActivated: false}}/>
        <Stack.Screen name="SearchFavs" component={SearchFavMovies}/>
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