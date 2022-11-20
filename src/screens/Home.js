import { Text, View, FlatList, StyleSheet } from 'react-native'
import {auth, db} from '../firebase/config'
import React, { Component } from 'react'
import Post from '../components/Post/Post'

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
            <Text>Home</Text>
            <FlatList
                data={this.state.posts}
                keyExtractor={(posteo)=> posteo.id.toString()}
                renderItem={({posteo}) => <Post navigation={this.props.navigation} id={posteo.id} postData={posteo.data} />}
            />
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Home