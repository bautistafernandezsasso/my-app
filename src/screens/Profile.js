import { View, Text, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Post from '../components/Post/Post'

class Perfil extends Component {

    constructor(props){
        super(props)
        this.state={
           usuario: [],
           posteos: [],
           bio: '',
           foto: '',
           //error: ""
        }
    }

    componentDidMount(){
        db.collection('users').where("owner", "==", this.props.route.params.email).onSnapshot(
            docs => {
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
            
                db.collection('posts').where("owner", "==", this.props.route.params.email).onSnapshot(
                    docs => {
                        let post = []
                        docs.forEach(doc => {
                            post.push({
                                id:doc.id,
                                data:doc.data()
                            })
                            this.setState({
                                posteos: post
                            })
                            })
                        })
                    }

        
render(){
    return(
        <View >
            <Image
            style= {styles.foto}
            source={{ uri: this.state.user.photo }}
            resizeMode='cover'  
            />                            
            <View>
                <View >
                    <View>
                        <Text style={styles.text}> {this.state.usuario.userName} Username: </Text>
                        <Text style={styles.text}>{this.state.usuario.bio} Descripcion: </Text>
                        <Text style={styles.text}>{this.state.usuario.owner} Email: </Text>
                        <Text style={styles.text}>Cantidad de posteos: {this.state.posteos.length}</Text>
                    </View>
                </View>

                <Text style={styles.text3}>Lista de Posteos</Text>
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgb(16, 146, 201)',
        paddingHorizontal:32
    },
    foto:{
        width: 90,
        height: 90,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "black",
        marginTop: 10,
        marginLeft: 10
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
    text3:{
        marginLeft: 150,
        fontFamily: 'emoji',
        fontSize: 18,
        marginTop: 60

    },
})


export default Perfil