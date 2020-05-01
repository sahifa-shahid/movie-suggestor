import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, TouchableHighlight, View, Alert, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur';

import {auth, db} from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'

import pulpfiction from './assets/pulpFiction.png'

function addMovie (title) {
    const user = auth.currentUser;
    db.collection("users").doc(user.uid).update({
        movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: 5})
    }).catch((err) => { 
        console.log(err)
        db.collection("users").doc(user.uid).set({
            movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: 5})
    });
})
}

export default function FavMoviesModal({ modalVisible, setModalVisible, item, navigation, data}) {
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
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(false); addMovie(item.title); navigation.navigate('FavMovies')}}>
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