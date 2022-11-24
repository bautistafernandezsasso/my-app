import { Text, View, StyleSheet } from 'react-native'
import {db} from '../firebase/config'
import React, { Component } from 'react'
import Post from '../components/Post/Post'
import {FlatList } from 'react-native-web';

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posteos
                    })
                })
                
            }
        )
    }
  
    render() {
        return (
        <View 
        style={styles.container}
        >
            <Text style={styles.title}>Home</Text>
            <FlatList
                data={this.state.posts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} postData={item.data} />}
            />
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

export default Home