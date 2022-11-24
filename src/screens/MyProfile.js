import { View, Text, Image} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Post from '../components/Post/Post'

class Perfil extends Component {

    constructor(){
        super()
        this.state={
           usuario: [],
           posteos: [],
           error: ""
        }
    }

    componentDidMount(){
        db.collection('users')
        .where("owner", "==", auth.currentUser.email)
        .onSnapshot(docs => {
                let user = []
                docs.forEach(doc => {
                    user.push({
                        id:doc.id,
                        data:doc.data()
                    })
                    this.setState({
                        usuario: user[0].data,
                    })
                    })
                })
            
                db.collection('posts')
                .where("owner", "==", auth.currentUser.email)
                .onSnapshot( docs => {
                        let post = []
                        docs.forEach(doc => {
                            user.push({
                                id:doc.id,
                                data:doc.data()
                            })
                            this.setState({
                                posteos: post
                            })
                            })
                        })
                    }

        
    signOut(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate("Login"))
        .catch(error=> console.log(error))
    }
    
    
            
            
            


render(){
    return(
        <View>
            <Text>{this.state.error}</Text>
            <View>
                <View >
                    <View>
                        <Text> {this.state.usuario.userName}</Text>
                        <Text>{this.state.usuario.bio}</Text>
                        <Text>{this.state.usuario.owner}</Text>
                    </View>
                    <View>
                        <View>
                            <Text onPress={ () => this.signOut()}>Cerrar sesión</Text>
                    </View>

                    </View>
                </View>

                <View>
                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
                </View>


                {this.state.posteos.length !== 0 ?
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={onePost => onePost.data.createdAt.toString()}
                        renderItem={({ item }) => <Post posteoData={item} navigation={this.props.navigation} />}
                    />
                : 
                    <Text> Aun no hay publicaciones</Text>
                }
            </View>
        </View>
    )
}}




export default Perfil
