import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function AlertMeModal({ alertVisible, setAlertVisible, navigation}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <BlurView tint="dark" intensity={100} style={styles.notBlurred}>
                <View style={styles.mainContainer}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.title}>Have you watched any new movies?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.redButton} onPress={() => {navigation.navigate('Recent', {screen: 'Search'}), setAlertVisible(false)}}>
                                <Text style={styles.buttonTitle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.whiteBorderButton} onPress={() => setAlertVisible(false)}>
                                <Text style={styles.buttonTitle}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
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
    notBlurred: {
        ...StyleSheet.absoluteFill,
    },
});