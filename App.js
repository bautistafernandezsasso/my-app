import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './src/Navigation/MainNavigation';
import { auth } from './src/firebase/config';
import { Component } from 'react';

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Register from './src/screens/Register'
import Profile from './src/screens/Profile'

/*  const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/> 
        <Stack.Screen name='Home' component={Home} options= {{ headerShown : false}}/>
        <Stack.Screen name='Register' component={Register} options= {{ headerShown : false}}/>
        <Stack.Screen name='Profile' component={Profile} options= {{ headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;*/

export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      initialScreen:'Login'
    }
  }
  
  render(){
    return (
        <MainNavigation initial={this.state.initialScreen} />
    );
  }
}