import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/logo.png'

export default function LandingPage() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.appTitle}>SCOUT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 77.04,
        marginRight: 11,
    },
    container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appTitle: {
        color: 'white',
        fontSize: 72,
        fontFamily: 'ReemKufi-Regular',
    },
});