import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import {products} from '../../api/allProducts'
import Post from '../../components/Post'

class Home extends Component {
    constructor(){
        super()
        this.state={
            info: products
        }
    }
  
    render() {
        return (
        <View>
            <Text>Home</Text>
            <FlatList
                data={this.state.info}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post info={item} />}
            />
        </View>
        )
    }
}

export default Home