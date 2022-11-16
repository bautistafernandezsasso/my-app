import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'
class Login extends Component {

    constructor(){
        super()
        this.state={
            mail:'',
            pass:'',
            logueado: false
        }
    }

    

  render() {
    return (
      <View>
        <Text></Text>
       
      </View>
    )
  }
}



export default Login
