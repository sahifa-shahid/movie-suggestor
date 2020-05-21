import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import movieRect from './assets/movieRect.png'
import { LinearGradient } from 'expo-linear-gradient'

import { auth, db } from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { useFocusEffect } from '@react-navigation/native';


export default function FavMovies({ navigation }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [favMovies, setFavMovies] = useState({})

    // useEffect(() => {
    //     function getDoc(user) {
    //         db.collection("users").doc(user.uid)
    //             .onSnapshot(function (doc) {
    //                 setData(doc.data())
    //                 setLoading(false)
    //             })
    //     }
    //     getDoc(auth.currentUser)
    // }, [])

    function makeDoc() {
        for (var key in favMovies) {
            db.collection("users").doc(auth.currentUser.uid).update({
                movies: firebase.firestore.FieldValue.arrayUnion({...favMovies[key], rating: 5})
            }).catch(() => { 
                db.collection("users").doc(auth.currentUser.uid).set({
                    movies: firebase.firestore.FieldValue.arrayUnion({...favMovies[key], rating: 5})
            })})
        }
    }

    return (
        // loading ? <Text>LOADING</Text> :
            <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <Text style={styles.description}>Pick your favourite movies!</Text>
                    <View style={styles.movieContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', { data: data, favMovies: favMovies, setFavMovies: setFavMovies, index: 0 })}>
                            {favMovies.hasOwnProperty(0) ? <Image style={styles.movieImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${favMovies[0].poster_path}` }} /> : <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', { data: data, favMovies: favMovies, setFavMovies: setFavMovies, index: 1 })}>
                            {favMovies.hasOwnProperty(1) ? <Image style={styles.movieImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${favMovies[1].poster_path}` }} /> : <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', { data: data, favMovies: favMovies, setFavMovies: setFavMovies, index: 2 })}>
                            {favMovies.hasOwnProperty(2) ? <Image style={styles.movieImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${favMovies[2].poster_path}` }} /> : <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', { data: data, favMovies: favMovies, setFavMovies: setFavMovies, index: 3 })}>
                            {favMovies.hasOwnProperty(3) ? <Image style={styles.movieImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${favMovies[3].poster_path}` }} /> : <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />}
                        </TouchableOpacity>
                    </View>
                    <View style={Object.keys(favMovies).length === 0 ? styles.buttonContainerInvisible : styles.buttonContainer}>
                        <TouchableOpacity style={styles.redButton} disabled={Object.keys(favMovies).length === 0 ? true : false} onPress={() => { makeDoc(); navigation.navigate('Navigation', { recentlyActivated: true }); setFavMovies({}) }}>
                            <Text style={styles.buttonTitle} >Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
    )
}

// Logged Out
// [Error: The email address is already in use by another account.]

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 45,
        marginRight: '7%',
        marginLeft: '7%',
        flex: 1
    },

    movieContainer: {
        flex: 5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    movieImage: {
        marginBottom: 10,
        width: 153,
        height: 230
    },

    description: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        flex: 1
    },
    buttonContainer: {
        flex: 1,
    },
    buttonContainerInvisible: {
        flex: 1,
        opacity: 0
    },
    redButton: {
        borderRadius: 30,
        backgroundColor: '#DD1515',
        padding: 12,
        alignItems: 'center',
    },
    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 25,
    },
});