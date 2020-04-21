import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Dimensions, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';

function firebaseSignUp(email, password, {navigation}, setModalVisibleSignUp) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    navigation.navigate('FavMovies')
    setModalVisibleSignUp(false)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

export default function SignUpModal({ modalVisibleSignUp, setModalVisibleSignUp, navigation }) {
    const [visible, setVisible] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleSignUp}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <BlurView tint="dark" intensity={modalVisibleSignUp ? 50 : 0} style={styles.notBlurred}>
                <SafeAreaView>
                    <ScrollView scrollEnabled={false}>
                        <TouchableOpacity onPress={() => { setModalVisibleSignUp(!modalVisibleSignUp); }}>
                            <MaterialIcons name='arrow-back' color='white' size={40} style={{ padding: 10 }} />
                        </TouchableOpacity>
                        <View style={styles.mainContainer}>
                            <View style={{ marginTop: 50 }}>
                                <TextInput
                                    placeholder="Type in your email!"
                                    placeholderTextColor='#e5e5e5'
                                    style={styles.username}
                                    value = {email}
                                    onChangeText={text => setEmail(text)}
                                    ></TextInput>
                            </View>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Type in your password!"
                                    placeholderTextColor='#e5e5e5'
                                    style={styles.password}
                                    secureTextEntry={visible}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                ></TextInput>
                                <TouchableOpacity onPress={() => setVisible(!visible)}>
                                    <MaterialIcons name='remove-red-eye' color='black' size={22} style={styles.eye} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonTitle} onPress={() => { firebaseSignUp(email, password, {navigation}, setModalVisibleSignUp) }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#dd1515',
        height: Dimensions.get('window').height,
        marginTop: Dimensions.get('window').height * (0.22),
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    username: {
        fontFamily: 'Raleway-Regular',
        fontSize: 17,
        marginLeft: 25,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginRight: 25,
        marginTop: 25,
        padding: 5
    },

    password: {
        fontFamily: 'Raleway-Regular',
        fontSize: 17,
        marginLeft: 25,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        flex: 3,
        padding: 5
    },

    passwordContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    eye: {
        padding: 10,
        marginRight: 10
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
        marginTop: 20
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
});