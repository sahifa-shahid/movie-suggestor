import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import movieRect from './assets/movieRect.png'

export default function FavMovies() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.description}>Pick your favourite movies!</Text>
            <View style={styles.movieContainer}>
                <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
                <Image style={styles.movieImage} source={movieRect} resizeMode="contain" />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.redButton}>
                    <Text style={styles.buttonTitle}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
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