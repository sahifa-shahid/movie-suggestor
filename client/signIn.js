import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Picker, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import logo from './assets/logo.png'
import eye from './assets/eye.png'
import arrow from './assets/arrow.png'

export default function SignIn() {
    const [selectedValue, setSelectedValue] = useState("");
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Image source={arrow} style={{ marginTop: 13, marginLeft: 13 }}></Image>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.appTitle}>SCOUT</Text>
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#DD1515' }}>
                        <View style={{ flex: 0.75, marginTop: 30 }}>
                            <TextInput
                                placeholder="Type in your username!"
                                style={{
                                    fontFamily: 'Raleway-Regular',
                                    fontSize: 17, marginLeft: 25, borderBottomWidth: 1, borderColor: 'black', marginRight: 25, marginTop: 25
                                }}></TextInput>
                        </View>
                        <View style={{ flex: 0.75, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                placeholder="Type in your password!"
                                style={{
                                    fontFamily: 'Raleway-Regular',
                                    fontSize: 17, marginLeft: 25, borderBottomWidth: 1, borderColor: 'black', marginRight: 25, flex: 1
                                }}
                                secureTextEntry={true}
                            ></TextInput>
                            <TouchableOpacity>
                                <Image source={eye} style={{ marginRight: 17 }}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginTop: 25 }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonTitle}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 77.04,
        marginRight: 11,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    appTitle: {
        color: 'white',
        fontSize: 72,
        fontFamily: 'ReemKufi-Regular',
    },

    dropdown: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 17,
    },

    subtitle: {
        fontFamily: 'Raleway-Regular',
        color: 'black',
        fontSize: 17,
        flex: 1,
        marginLeft: 25,
    },

    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 25,
    },

    button: {
        borderRadius: 30,
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#000000',
        marginRight: '8%',
        marginLeft: '8%',
        //flex:1,
    },
});