import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home'
import {FontAwesome} from '@expo/vector-icons'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator
    screenOptions={
        {
            tabBarStyle:{
                backgroundColor:'red'
            }
        }
    }
    >
        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false
        }}
        />
        <Tab.Screen name={'Profile'} component={Profile} />

        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          tabBarIcon: () => <FontAwesome name="search" size={35} color={'black'}/>,
          headerShown:false
        }} 
        />


    </Tab.Navigator>
  )
}

