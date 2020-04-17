// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import RecentlyWatched from './recentlyWatched'
import GenerateScreen from './generateScreen'
import ActivityScreen from './activityScreen'
import SettingsScreen from './settingScreen'

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
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
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1
    },
})
