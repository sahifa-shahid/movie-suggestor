import React, { Component, useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableHighlight, View, Alert, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur';

import pulpfiction from './assets/pulpFiction.png'

export default function MovieModal({ modalVisible, setModalVisible }) {
    const paragraph = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of"
    const [testing, setTesting] = useState(4)
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
                        <Image source={pulpfiction} style={styles.moviePoster}></Image>
                        <AdjustLabel fontSize={40} text={"PULP FICTION"} style={styles.movieTitle} numberOfLines={2} />
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 2 }}>
                            <View style={(testing >= 1) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(testing >= 2) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(testing >= 3) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(testing >= 4) ? styles.activeRateButton : styles.rateButton}></View>
                            <View style={(testing >= 5) ? styles.activeRateButton : styles.rateButton}></View>
                        </View>
                        <Text style={styles.genres}>Drama | Thriller | Crime</Text>
                        <Text style={styles.info}>1998 • 1h59m • R-Rated</Text>
                        <AdjustLabel fontSize={11} text={paragraph} style={styles.paragraph} numberOfLines={8} />
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
        marginBottom: 13
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
})