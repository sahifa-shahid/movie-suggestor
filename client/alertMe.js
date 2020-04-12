import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function AlertMe(props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.alertContainer}>
                <Text style={styles.title}>Have you watched any new movies?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.redButton} onPress={() => props.setPopUp(!props.popUp)}>
                        <Text style={styles.buttonTitle}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteBorderButton}>
                        <Text style={styles.buttonTitle}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: '50%',
        bottom: '50%'
    },
    alertContainer: {
        backgroundColor: '#363636',
        width: '85%',
        height: 324,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20
    },


    title: {
        marginTop: '10%',
        color: 'white',
        fontSize: 30,
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        flex: 1
    },

    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
        padding: 30
    },
    redButton: {
        borderRadius: 30,
        backgroundColor: '#DD1515',
        padding: 12,
        alignItems: 'center',
        marginBottom: 30
    },

    whiteBorderButton: {
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
    },
    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 25,
    },


});