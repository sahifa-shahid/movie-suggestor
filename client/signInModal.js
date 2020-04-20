import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Dimensions, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignInModal({ modalVisibleSignIn, setModalVisibleSignIn, navigation }) {
    const [visible, setVisible] = useState(true)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleSignIn}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <BlurView tint="dark" intensity={modalVisibleSignIn ? 50 : 0} style={styles.notBlurred}>
                <SafeAreaView>
                    <ScrollView scrollEnabled={false}>
                        <TouchableOpacity onPress={() => { setModalVisibleSignIn(!modalVisibleSignIn); }}>
                            <MaterialIcons name='arrow-back' color='white' size={40} style={{ padding: 10 }} />
                        </TouchableOpacity>
                        <View style={styles.mainContainer}>
                            <View style={{ marginTop: 50 }}>
                                <TextInput
                                    placeholder="Type in your username!"
                                    placeholderTextColor='#e5e5e5'
                                    style={styles.username}></TextInput>
                            </View>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Type in your password!"
                                    placeholderTextColor='#e5e5e5'
                                    style={styles.password}
                                    secureTextEntry={visible}
                                ></TextInput>
                                <TouchableOpacity onPress={() => setVisible(!visible)}>
                                    <MaterialIcons name='remove-red-eye' color='white' size={22} style={styles.eye} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Navigation'); setModalVisibleSignIn(false) }}>
                                <Text style={styles.buttonTitle}>Sign In</Text>
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
        backgroundColor: '#181818',
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
        borderColor: 'white',
        marginRight: 25,
        marginTop: 25,
        padding: 5,
        color: 'white'
    },

    password: {
        fontFamily: 'Raleway-Regular',
        fontSize: 17,
        marginLeft: 25,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginRight: 10,
        flex: 3,
        padding: 5,
        color: 'white'
    },

    passwordContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#dd1515',
        marginRight: '8%',
        marginLeft: '8%',
        marginTop: 20
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
});