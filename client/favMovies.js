import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import movieRect from './assets/movieRect.png'
import { LinearGradient } from 'expo-linear-gradient'

import {auth, db} from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'




export default function FavMovies({ navigation, route }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        function getDoc(user) {
            db.collection("users").doc(user.uid)
            .onSnapshot(function (doc) {
              setData(doc.data())
              setLoading(false)
            })
          }
        getDoc(auth.currentUser)
    }, [])
    return (
        loading ? <Text>LOADING</Text> :
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <Text style={styles.description}>Pick your favourite movies!</Text>
                <View style={styles.movieContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', data)}>
                        <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', data)}>
                        <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', data)}>
                        <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchFavs', data)}>
                        <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <View>
                    {data.movies.map(movie => <Text style={styles.buttonTitle}>{movie.title}</Text>)}
                </View>
                <View style={data.movies.length === 0 ? styles.buttonContainerInvisible : styles.buttonContainer}>
                    <TouchableOpacity style={styles.redButton} disabled={data.movies.length === 0 ? true : false} onPress={() => navigation.navigate('Navigation', {recentlyActivated: true})}>
                        <Text style={styles.buttonTitle} >Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

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