import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import logo from './assets/logo.png'

export default function SettingsScreen({navigation}) {
    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.pageTitle}>ACCOUNT SETTINGS</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.redButton} onPress={() => navigation.navigate('LandingPage')}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 49,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '7%'
      },
      pageTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 40
      },
      logo: {
        width: 50,
        height: 77.04,
        marginRight: 11
      },
    redButton: {
        borderRadius: 30,
        backgroundColor: '#DD1515',
        padding: 12,
        alignItems: 'center',
        marginLeft: '8%',
        marginRight: '8%'
    },
    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 25,
    },
})
