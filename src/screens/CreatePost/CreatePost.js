import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Camara from '../../components/Camara/Camara'
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
          {
          <View>
              <Text> Nuevo Posteo </Text>

              <View>
                  <TextInput
                      placeholder='Texto Posteo'
                      keyboardType='default'
                      onChangeText={text => this.setState({ textoPosteo: text })}
                      value={this.state.textoPosteo}
                  />

                  <TouchableOpacity onPress={() => this.createPost(this.state.textoPosteo, this.state.photo)}>
                      <Text> Done </Text>
                  </TouchableOpacity> 
              </View> 
          </View>
          }
          </View>

      )
  }
}

export default CreatePost