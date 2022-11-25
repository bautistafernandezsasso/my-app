import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList, } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'


class Search extends Component {
    constructor(props){
        super(props)
        this.state={
          text:'',
          posts: [],
      }
  };



buscar(text){

  this.setState({text:text})
  console.log(text)
  db.collection('users').where('owner', '==', text).onSnapshot(
      docs => {
          let posts = [];
          docs.forEach( doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()
              })
              this.setState({
                  posts: posts,
              }, console.log(this.state.posts))
          })
          
      }
  )
}


render(){
  return( <View> 
      <TextInput 
          placeholder='Buscar usuarios..'
          keyboardType="default"
          onChangeText={text => this.buscar(text)}
          value={this.state.text}/>
          <TouchableOpacity onPress={()=>this.buscar(this.state.text)}>
                      <Text>Buscar</Text>
          </TouchableOpacity>
          <FlatList 
                      data={this.state.posts}
                      keyExtractor={ onePost => onePost.id.toString()}
                      renderItem={ ({item})  => <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{ email: item.data.owner } )}>
                      { this.state.text === item.data.owner ?
              <Text> {item.data.owner}</Text> : <Text>No exsiste el usuario</Text> }
                 </TouchableOpacity> }
                          />
                  
      </View>
      )

}



}

export default Search;