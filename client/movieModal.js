import React, { Component, useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Image } from 'react-native';

import pulpfiction from './assets/pulpFiction.png'

export default function MovieModal() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ height: 70 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>

                <View style={styles.modalContainer}>
                    <View>
                        <Image source={pulpfiction}></Image>
                        <Text style = {styles.movieTitle}>PULP FICTION</Text>
                        <TouchableHighlight
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <TouchableHighlight
                onPress={() => {
                    setModalVisible(true);
                }}>
                <Text>Show Modal</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#2F2F2F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginHorizontal: 20,
        borderRadius: 40,
    },
    movieTitle: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 30
    },
})