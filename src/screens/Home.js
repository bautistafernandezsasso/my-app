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
            <Text>Home</Text>
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
        flex:1
    }
})

export default Home