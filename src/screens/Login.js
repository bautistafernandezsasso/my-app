import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'


class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            mail:'',
            pass:'',
            logueado: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => { 
            if (user !== null) {
                this.props.navigation.navigate('TabNavigation')    
            }
        })
        
    }

    loguear(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => console.log(err))
    }

  render() {
   // console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
            <TextInput style={styles.text}
             onChangeText={ text => this.setState( {mail:text} )}
             placeholder='Ingresa tu email'
             value={this.state.mail}
            />
            <TextInput style={styles.text}
             onChangeText={ text => this.setState( {pass:text} )}
             placeholder='Ingresa tu password'
             value={this.state.pass}
            />
            <View>
                <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.pass)}>
                    <Text style={styles.text2}>Loguearme</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>Aun no tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text style={styles.text2}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgb(16, 146, 201)',
        paddingHorizontal:32
    },
    title:{
        fontSize:30  
    },
    text:{
        backgroundColor: 'rgba(204, 204 ,204, 0.1)',
        fontSize: 20,
        borderRadius: 10,
        marginTop: 5
     
    },
    text2:{
        backgroundColor: 'rgb(134, 192, 217)',
        borderRadius: 10,
        fontSize: 30,
        marginTop: 5
     
    },
})

export default Login