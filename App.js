import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './src/Navigation/MainNavigation';
import { auth } from './src/firebase/config';
import { Component } from 'react';




 const Stack = createNativeStackNavigator();

function App() {
  return (
    <MainNavigation/>
  );
};


export default App


