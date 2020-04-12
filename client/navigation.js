// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Text, View, StyleSheet, Button, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';

import RecentlyWatched from './recentlyWatched'
import GenerateScreen from './generateScreen'
import MovieModal from './movieModal';

function ActivityScreen() {
    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <MovieModal/>
            </View>
        </LinearGradient>
    );
}

function SettingsScreen({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Messages')}/>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Activity') {
                            iconName = focused ? 'view-carousel' : 'view-carousel';
                        } else if (route.name === 'Generate') {
                            iconName = focused ? 'ondemand-video' : 'ondemand-video';
                        } else if (route.name === 'Recent') {
                            iconName = focused ? 'turned-in-not' : 'turned-in-not'
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'person-outline' : 'person-outline';
                        }
                        // You can return any component that you like here!
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#DD1515',
                    inactiveTintColor: 'white',
                    style: {
                        backgroundColor: 'black'
                    },
                    animationEnabled: true,
                    keyboardHidesTabBar: true
                }}
            >
                <Tab.Screen name="Activity" component={ActivityScreen} />
                <Tab.Screen name="Generate" component={GenerateScreen} />
                <Tab.Screen name="Recent" component={RecentlyWatched} />
                <Tab.Screen name="Settings" component={SettingsScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1
    },
})
