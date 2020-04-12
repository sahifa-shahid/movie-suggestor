import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import logo from './assets/logo.png'
import frozen from './assets/frozen.png'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53aabb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa9f7f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571ei29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571he29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-14557a1e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72s',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72hi',
        title: 'Third Item',
    },
];

function Item() {
    return (
        <View style={styles.item}>
            <Image source={frozen} />
        </View>
    );
}

function headerComponent() {
    const [selectedValue, setSelectedValue] = useState("All");
    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.pageTitle}>GENERATED MOVIES</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={selectedValue === 'All' ? styles.buttonActive : styles.button} onPress={() => setSelectedValue("All")}>
                    <Text style={selectedValue === 'All' ? styles.buttonTitleActive : styles.buttonTitle}>All</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={selectedValue === 'Horror' ? styles.buttonActive : styles.button} onPress={() => setSelectedValue("Horror")}>
                    <Text style={selectedValue === 'Horror' ? styles.buttonTitleActive : styles.buttonTitle}>Horror</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedValue === 'Action' ? styles.buttonActive : styles.button} onPress={() => setSelectedValue("Action")}>
                    <Text style={selectedValue === 'Action' ? styles.buttonTitleActive : styles.buttonTitle}>Action</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedValue === 'Drama' ? styles.buttonActive : styles.button} onPress={() => setSelectedValue("Drama")}>
                    <Text style={selectedValue === 'Drama' ? styles.buttonTitleActive : styles.buttonTitle}>Drama</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedValue === 'Comedy' ? styles.buttonActive : styles.button} onPress={() => setSelectedValue("Comedy")}>
                    <Text style={selectedValue === 'Comedy' ? styles.buttonTitleActive : styles.buttonTitle}>Comedy</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.subtitleContainer}>
                <View style={styles.leftBar}></View>
                <Text style={styles.subtitle}>Top Picks</Text>
                <View style={styles.rightBar}></View>
            </View>
        </View>
    )
}

function MovieScrollView() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item />}
                keyExtractor={item => item.id}
                ListHeaderComponent={headerComponent()}
                ListHeaderComponentStyle={{ marginTop: 25, marginBottom: 8 }}
                numColumns={3}
                columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
            />
        </SafeAreaView>
    );
}

export default function GenerateScreen() {
    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            <View style={styles.background}>
                {MovieScrollView()}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        marginVertical: 8,
    },
    background: {
        flex: 1
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '7%'
    },
    pageTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 40
    },
    subtitleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subtitle: {
        flex: -1,
        fontFamily: 'Raleway-Medium',
        color: '#DD1515',
        fontSize: 18,
        marginHorizontal: 4
    },
    leftBar: {
        flex: 0.5,
        backgroundColor: 'white',
        paddingTop: 0.5,
        marginLeft: '7%'
    },
    rightBar: {
        flex: 4.5,
        backgroundColor: 'white',
        paddingTop: 0.5,
        marginRight: '7%'
    },
    logo: {
        width: 50,
        height: 77.04,
        marginRight: 11
    },
    buttonContainer: {
        flex: 1,
        marginVertical: 27,
        //alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        borderRadius: 10,
        //borderColor: 'white',
        //borderWidth: 1,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 14,
    },
    buttonActive: {
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonTitleActive: {
        fontFamily: 'Raleway-Regular',
        color: 'black',
        fontSize: 14,
    }

});