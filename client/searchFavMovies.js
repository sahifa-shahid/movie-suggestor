import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Keyboard, View, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

import FavMoviesModal from './favMoviesModal'
import batman from './assets/batman.png'

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
        title: 'Fourth Item',
    }]


export default function SearchFavMovies({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState(DATA[0])
    const [text, setText] = useState("")

    function Item({ setModalVisible, item }) {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {setCurrentItem(item); setModalVisible(true)}}>
                    <Image source={batman} />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            {console.log(route.params)}
            <FavMoviesModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={currentItem} navigation = {navigation} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA.filter((movie) => !(route.params.movies.some(movieSeen => movieSeen.title === movie.title))).filter((movie) => movie.title.includes(text))}
                    renderItem={({ item }) => <Item setModalVisible={setModalVisible} item={item}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={SearchScreen({ navigation, text, setText })}
                    ListHeaderComponentStyle={{ marginBottom: 8 }}
                    numColumns={3}
                    columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

function SearchScreen({ navigation, text, setText}) {
    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={() => navigation.navigate('FavMovies')}>
                <MaterialIcons name='arrow-back' color='white' size={35} style={{ marginTop: 15, marginLeft: 10, marginBottom: 40 }} />
            </TouchableOpacity>
            <View style={styles.button}>
                <TextInput placeholder="Type in a movie!"
                    placeholderTextColor="grey"
                    style={styles.buttonTitle}
                    keyboardAppearance="dark"
                    onChangeText={chars => setText(chars)}
                    value={text} />
                <TouchableOpacity>
                    <MaterialIcons name='search' color='white' size={25} style={{ marginRight: 10, flex: 1 }}></MaterialIcons>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        marginVertical: 8,
    },
    button: {
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '8%',
        marginLeft: '8%',
        marginBottom: 80
    },
    buttonTitle: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        fontSize: 17,
        marginLeft: 11,
        flex: 12,
    },
})