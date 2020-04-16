import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'

export default function SecondLandingPage() {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.appTitle}>SCOUT</Text>
            </View>
            <Text style={styles.subtitle}>Find the perfect movie!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.redButton}>
                    <Text style={styles.buttonTitle}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>Sign In</Text>
                </TouchableOpacity>
            </View>
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
        flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    appTitle: {
        color: 'white',
        fontSize: 72,
        fontFamily: 'ReemKufi-Regular',
    },

    subtitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        flex: 2
    },

    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 25,
    },

    redButton: {
        borderRadius: 30,
        backgroundColor: '#DD1515',
        padding: 12,
        alignItems: 'center',
    },

    button: {
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
        marginTop: 30
    },

    buttonContainer: {
        flex: 2,
        marginLeft: '8%',
        marginRight: '8%'
    },
});