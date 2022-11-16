import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Camara from '../components/Camara'
import {TextInput} from 'react-native-web'

class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            descripcion:'',
            foto:'',
            mostrarCamara: true,
            likes: [],
            comentarios:[]
        }
    };
    createPost(descripcion, foto){
        db.collection('posts').add({
                owner: auth.currentUser.email, //deberia ser el usuario registrado. auth.currentUser
                description: description,
                photo: photo,
                likes: this.state.likes,
                comentarios: this.state.comentarios,
                createdAt: Date.now()
            })
            .then(() => {
                this.setState({
                    description:'',
                    likes: [],
                    comentarios: []
                })
                this.props.navigation.navigate('Home')
            })
            .catch( e => console.log(e))
    }




  render() {
    return (
      <View>
        <Text>CreatePost</Text>
      </View>
    )
  }
}

export default CreatePost