import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './searchScreen'

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
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72add',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7fff2',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e2',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e2fds9d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7fdsf2',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7fsd2',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72132',
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

function headerComponent({navigation}) {
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

function MovieScrollView({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item />}
        keyExtractor={item => item.id}
        ListHeaderComponent={headerComponent({navigation})}
        ListHeaderComponentStyle={{ marginTop: 25, marginBottom: 8 }}
        numColumns={3}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
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

function RecentlyWatched({navigation}) {
  return (
      <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
          <View style={styles.background}>
              {MovieScrollView({navigation})}
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