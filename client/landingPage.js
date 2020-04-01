import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/logo.svg'

export default function LandingPage() {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', margin: 'auto', alignItems: 'center' }}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.appTitle}>SCOUT</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    background: {
        height: '100vh',
        backgroundColor: 'white',
    },

    logo: {
        width: '50px',
        height: '77.04px',
        marginRight: '11px',
    },

    appTitle: {
        color: 'white',
        fontSize: 72,
        fontFamily: 'ReemKufi-Regular',
    },
});