import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {Component} from 'react'
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'
import Home from '../screens/Home/Home'
import TabNavigation from './TabNavigation'
import { auth } from '../firebase/config'
const Stack = createNativeStackNavigator()

function MainNavigation() {
        return (
          <NavigationContainer>
              <Stack.Navigator
              >
                   <Stack.Screen 
                      name='Login' 
                      component={Login}
                      options={{
                          headerShown:false
                        }}
                        /> 
                  <Stack.Screen
                      name='Register'
                      component={Register}
                      />
                  <Stack.Screen
                      name='TabNavigation'
                      component={TabNavigation}
                      options={{
                          headerShown:false
                        }}
                        />
                 
              </Stack.Navigator>
          </NavigationContainer>
        )
    }


export default MainNavigation