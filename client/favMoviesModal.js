import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur';

import {auth, db} from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'

// function addMovie (item) {
//     const user = auth.currentUser;

//     db.collection("users").doc(user.uid).update({
//         movies: firebase.firestore.FieldValue.arrayUnion({...item, rating: 5})
//     }).catch(() => { 
//         db.collection("users").doc(user.uid).set({
//             movies: firebase.firestore.FieldValue.arrayUnion({...item, rating: 5})
//     });
// })
// }

function edit(item, setFavMovies, favMovies, index) {
    let copy = favMovies
    copy[index] = item
    setFavMovies({...copy})
}

export default function FavMoviesModal({ modalVisible, setModalVisible, item, navigation, setFavMovies, favMovies, index}) {
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
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.moviePoster}></Image>
                            <AdjustLabel fontSize={40} text={item.title} style={styles.movieTitle} numberOfLines={2} />
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(false); edit(item, setFavMovies, favMovies, index); navigation.navigate('FavMovies')}}>
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
        marginBottom: 13,
        width: 168,
        height: 252
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