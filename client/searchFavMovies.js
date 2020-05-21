import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Keyboard, View, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

import FavMoviesModal from './favMoviesModal'
import batman from './assets/batman.png'


export default function SearchFavMovies({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState()
    const [searchData, setSearchData] = useState()
    const [input, setInput] = useState("")


    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    async function getMoviesFromApi() {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bd7527de69fe3480678236d07c155147&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${formatDate(Date.now()-1.577e+10)}&release_date.lte=${formatDate(Date.now()-7.884e+6)}`);
            let responseJson = await response.json();
            let trendingList = await responseJson.results
            setSearchData(trendingList)
            setCurrentItem(trendingList[0])
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (searchData === undefined) {
            getMoviesFromApi()
        }
    }, [])

    async function searchMoviesFromApi() {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bd7527de69fe3480678236d07c155147&language=en-US&query=${input}&page=1&include_adult=false`);
            let responseJson = await response.json();
            let filterResults = await responseJson.results.filter(movie => movie.poster_path !== null)
            setSearchData(filterResults)
        } catch (error) {
            console.error(error);
        }
    }

    function Item({ setModalVisible, item, index }) {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {setCurrentItem(item); setModalVisible(true)}}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={{ width: 100, height: 150 }} />
                </TouchableOpacity>
            </View>
        );
    }

    
    function SearchScreen({ navigation }) {
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
                        value={input}
                        onChangeText = {(text) => setInput(text) }
                        onSubmitEditing = { () => {if (input !== "") {searchMoviesFromApi()} else {getMoviesFromApi()}}}/>
                    <TouchableOpacity onPress={() => {if (input !== "") {searchMoviesFromApi()} else {getMoviesFromApi()}}}>
                        <MaterialIcons name='search' color='white' size={25} style={{ marginRight: 10, flex: 1 }}></MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            {searchData === undefined || currentItem === undefined ? <Text>Loading...</Text> :
            <SafeAreaView style={styles.container}>
                {/* {console.log("fav movies", route.params.favMovies)} */}
                <FavMoviesModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={currentItem} navigation = {navigation} setFavMovies = {route.params.setFavMovies} favMovies={route.params.favMovies} index = {route.params.index} />
                <FlatList
                    // data={searchData.filter((movie) => !(route.params.favMovies.some(movieSeen => movieSeen.id === movie.id)))}
                    data={searchData}
                    renderItem={({ item, index }) => <Item setModalVisible={setModalVisible} item={item} index={index}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={SearchScreen({ navigation })}
                    ListHeaderComponentStyle={{ marginBottom: 8 }}
                    numColumns={3}
                    columnWrapperStyle={{ display: "flex", marginHorizontal: 10}}
                />
            </SafeAreaView>}
        </LinearGradient>
    );
}

// function SearchScreen({ navigation, text, setText}) {
//     return (
//         <View style={styles.background}>
//             <TouchableOpacity onPress={() => navigation.navigate('FavMovies')}>
//                 <MaterialIcons name='arrow-back' color='white' size={35} style={{ marginTop: 15, marginLeft: 10, marginBottom: 40 }} />
//             </TouchableOpacity>
//             <View style={styles.button}>
//                 <TextInput placeholder="Type in a movie!"
//                     placeholderTextColor="grey"
//                     style={styles.buttonTitle}
//                     keyboardAppearance="dark"
//                     onChangeText={chars => setText(chars)}
//                     value={text} />
//                 <TouchableOpacity>
//                     <MaterialIcons name='search' color='white' size={25} style={{ marginRight: 10, flex: 1 }}></MaterialIcons>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

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
        flex: 0.333333,
        alignItems: 'center'
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