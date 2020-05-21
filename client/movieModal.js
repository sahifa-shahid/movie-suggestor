import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, TouchableHighlight, View, Alert, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur';

import pulpfiction from './assets/pulpFiction.png'

export default function MovieModal({ modalVisible, setModalVisible, item }) {

    const [movieInfo, setMovieInfo] = useState()

    useEffect(() => {
        async function getMoviesFromApi() {
            try {
                let response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=bd7527de69fe3480678236d07c155147`);
                let responseJson = await response.json();
                setMovieInfo(responseJson)
            } catch (error) {
                console.error(error);
            }
        }
        getMoviesFromApi()
    }, [item])

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
                    {movieInfo === undefined ? <Text>Loading...</Text> :
                    <View style={styles.modalContainer}>
                        <TouchableOpacity>
                            <MaterialIcons name='close' color='white' size={27} style={{ alignSelf: 'flex-end' }} onPress={() => { setModalVisible(!modalVisible); }} />
                        </TouchableOpacity>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.moviePoster}></Image>
                        <AdjustLabel fontSize={40} text={item.title} style={styles.movieTitle} numberOfLines={2} />
                        {item.hasOwnProperty('rating') ? 
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 2 }}>
                            <View style={(item.rating >= 1) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(item.rating >= 2) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(item.rating >= 3) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(item.rating >= 4) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(item.rating >= 5) ? styles.activeRateButton : styles.rateButton}></View>
                        </View> : null}
                    <Text style={styles.genres}>{movieInfo.genres.map((genre, index) => {
                        if(index === movieInfo.genres.length-1) {
                            return `${genre.name}`
                        } else {
                            return `${genre.name} | `
                        }
                    })}</Text>
                        <Text style={styles.info}>{item.release_date.slice(0,4)} • {parseInt(movieInfo.runtime/60)}h{movieInfo.runtime % 60}m</Text>
                        <AdjustLabel fontSize={11} text={item.overview} style={styles.paragraph} numberOfLines={8} />
                    </View>
                    }
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
            }}
        >
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
        paddingLeft: 40,
        paddingRight: 20
    },
    movieTitle: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    rateButton: {
        backgroundColor: 'white',
        padding: 4.5,
        borderRadius: 9,
        marginRight: 8,
    },
    activeRateButton: {
        backgroundColor: '#DD1515',
        padding: 4.5,
        borderRadius: 9,
        marginRight: 8,
    },
    genres: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 13
    },
    info: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 11
    },
    paragraph: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 11,
        marginTop: 20
    },
    moviePoster: {
        marginBottom: 13,
        width: 168,
        height: 252
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
})