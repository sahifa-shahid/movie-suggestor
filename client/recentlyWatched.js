import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './searchScreen'
import MovieModal from './movieModal'

import logo from './assets/logo.png'

import { db, auth } from './firebaseHandler'


function Item({ setModalVisible, item, setCurrentItem, index }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {setCurrentItem(item); setModalVisible(true)}}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={{ width: 100, height: 150 }} />
      </TouchableOpacity>
    </View>
  );
}

function headerComponent({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.pageTitle}>RECENTLY WATCHED</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
          <MaterialIcons name='edit' color='white' size={20} style={{ marginRight: 4 }} />
          <Text style={styles.buttonTitle}>Add Recently Watched</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subtitleContainer}>
        <View style={styles.leftBar}></View>
        <Text style={styles.subtitle}>Recent</Text>
        <View style={styles.rightBar}></View>
      </View>
    </View>
  )
}

function MovieScrollView({ navigation, setModalVisible, data, setCurrentItem }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item setModalVisible={setModalVisible} item={item} setCurrentItem={setCurrentItem} index={index} />}
        ListHeaderComponent={headerComponent({ navigation })}
        ListHeaderComponentStyle={{ marginTop: 25, marginBottom: 8 }}
        numColumns={3}
        columnWrapperStyle={{ display: "flex", marginHorizontal: 10}}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
export default function RecentScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecentlyWatched" component={RecentlyWatched} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function RecentlyWatched({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [currentItem, setCurrentItem] = useState()
  useEffect(() => {
    function getDoc(user) {
      db.collection("users").doc(user.uid)
        .onSnapshot(function (doc) {
          setData(doc.data().movies.reverse())
          setCurrentItem(doc.data().movies[0])
          setLoading(false)
        })
    }
    getDoc(auth.currentUser)
  }, [])

  return (
    <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
      {loading ? <Text>Loading...</Text> :
        <View style={styles.background}>
          <MovieModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={currentItem} />
          {MovieScrollView({ navigation, setModalVisible, data, setCurrentItem })}
        </View>}
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
    flex: 0.333333,
    alignItems: 'center'
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
    marginVertical: 30
  },
  button: {
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '14%',
    marginLeft: '14%'
  },
  buttonTitle: {
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    fontSize: 18,
  },
});