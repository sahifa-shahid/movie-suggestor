import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, TouchableHighlight, View, Alert, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur';

import {auth, db} from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'

import pulpfiction from './assets/pulpFiction.png'

function addMovie (title, rating) {
    const user = auth.currentUser;

    db.collection("users").doc("sahifa").update({
        movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: rating})
    }).catch(() => { 
        db.collection("users").doc("sahifa").set({
            movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: rating})
    });
})
}

export default function RatingModal({ modalVisible, setModalVisible, item}) {
    const [testing, setTesting] = useState(0)
    useEffect(() => setTesting(0), [modalVisible])
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <BlurView tint="dark" intensity={100} style={styles.notBlurred}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity>
                            <MaterialIcons name='close' color='white' size={27} style={{ alignSelf: 'flex-end' }} onPress={() => { setModalVisible(!modalVisible); }} />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={pulpfiction} style={styles.moviePoster}></Image>
                            <AdjustLabel fontSize={40} text={item.title} style={styles.movieTitle} numberOfLines={2} />
                            <Text style={styles.question}>How would you like to rate this movie?</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 38, marginTop: 2, justifyContent: 'space-evenly', display: 'flex', width: '95%' }}>
                                <TouchableOpacity onPress={() => setTesting(1)}>
                                    <View style={(testing >= 1) ? styles.activeRateButton : styles.rateButton}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTesting(2)}>
                                    <View style={(testing >= 2) ? styles.activeRateButton : styles.rateButton}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTesting(3)}>
                                    <View style={(testing >= 3) ? styles.activeRateButton : styles.rateButton}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTesting(4)}>
                                    <View style={(testing >= 4) ? styles.activeRateButton : styles.rateButton}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTesting(5)}>
                                    <View style={(testing >= 5) ? styles.activeRateButton : styles.rateButton}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(false); addMovie(item.title, testing)}}>
                                <Text style={styles.buttonTitle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}



const AdjustLabel = ({ fontSize, text, style, numberOfLines }) => {
    const [currentFont, setCurrentFont] = useState(fontSize);

    return (
        <Text
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit
            style={[style, { fontSize: currentFont }]}
            onTextLayout={(e) => {
                const { lines } = e.nativeEvent;
                if (lines.length > numberOfLines) {
                    setCurrentFont(currentFont - 1);
                }
            }}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#2F2F2F',
        //justifyContent: 'center',
        //alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginHorizontal: 20,
        borderRadius: 40,
        paddingVertical: 20,
        paddingLeft: 30,
        paddingRight: 30
    },
    movieTitle: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center'
    },
    rateButton: {
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 13,
        flex: -1
    },
    activeRateButton: {
        backgroundColor: '#DD1515',
        padding: 13,
        borderRadius: 13,
        flex: -1
    },
    question: {
        fontFamily: 'Raleway-SemiBold',
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 25,
        marginBottom: 22
    },
    moviePoster: {
        marginBottom: 13
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
    button: {
        borderRadius: 22,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
    },
    buttonTitle: {
        fontFamily: 'Raleway-SemiBold',
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 20
    },
})