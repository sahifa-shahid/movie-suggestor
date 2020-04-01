import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from './assets/logo.svg'

export default function App() {
  return (
    <LinearGradient colors={["rgba(0,0,0,0.95)", "#4e4e4e", "rgba(0,0,0,0.95)"]} style={styles.background}>
        <Image source={logo} style={styles.logo} resizeMode="contain"/>
        <Text style={{color: 'white', fontFamily: 'Raleway-Regular', fontSize: '72px'}}>SCOUT</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100vh',
    backgroundColor: 'white',
  },
  
  logo: {
    width: "13%", 
    flex: 1, 
    marginLeft: '10%',
  },
  
  appTitle: {
    font: "R"
  },
});