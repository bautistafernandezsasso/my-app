import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList, } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { SearchBar } from 'react-native'

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
          data: [],
          id:'', 
          results: [],
          users: [], 
          loading: false,
          busqueda: '',
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
          let resultados = [];
          doc.forEach(doc => {
            resultados.push({
                id: doc.id, 
                data: doc.data()
            })
            
          })
          this.setState(
            {users: resultados}
          )
         
        })
    }



    buscar(text){
    
        let usersFilter = this.state.data.filter(elm =>
        { 
         return elm.data.username.toUpperCase().includes(text.toUpperCase())})
         console.log(usersFilter);
         this.setState({
           results: usersFilter,
           busqueda: text,
        })
    }

   render() {
  
    return( 
        <View style={styles.container}>
            <Text style={styles.text}>Search</Text>
            <TextInput  
              onChangeText={ text => this.buscar( text )}
              placeholder='Ingresa tu busqueda'
              value={this.state.busqueda}>
            </TextInput>

    
    {
        <FlatList style={styles.text}
          data={this.state.users}
          keyExtractor={(item) => item.id}
          renderItem= {({item}) => <Text>{item.data.username}</Text>}
         />
    }
             
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

export default Search;