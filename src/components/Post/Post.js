import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase';


class Post extends Component{

    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.likes.length,
            comentario: "",
            comentarios: '',
            like: false,
            userFoto:'',
        }
    }

componentDidMount(){
    if(this.props.postData.likes.includes(auth.currentUser.email)){
        this.setState({
            like:true
        })
        
    }
}

funcionLikear(){
    db.collection('posts')
        .doc(this.props.postData.id)
        .update({
            Likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp =>  {
            this.setState({
            likes: this.state.cantidadDeLikes + 1,
            like: true,
        })
    })
        .catch(e => console.log(e))
}

funcionDislikear(){
    db.collection('posts')
        .doc(this.props.postData.id)
        .update({
            Likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp =>  {
            this.setState({
            likes: this.state.cantidadDeLikes - 1,
            like: false,
        })
    })
        
        .catch(e => console.log(e))
}

render() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.photo}
                source={this.props.postData.foto }
                resizeMode='cover'
            />
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {mail: this.state.usuario.data.owner})}>
            </TouchableOpacity>

            {this.state.like ?
                <TouchableOpacity onPress={() => this.funcionDislikear()}>
                    <Text style={styles.data} >Dislike</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.funcionLikear()}>
                    <Text style={styles.data}>Like</Text>
                </TouchableOpacity>
            }

            <Text style={styles.data}> {this.state.cantidadDeLikes} likes </Text>
            <Text style={styles.data}>{this.props.postData.description}</Text> 

            <View style = {styles.comentariosSeccion}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", { id: this.props.id })}>
                    <Text  style= {styles.textito}> Comentarios: {this.props.postData.comentarios.length} </Text>
                        </TouchableOpacity>
                   </View>

            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(94, 171, 194)',
        alignItems: 'center',
        borderRadius: 20,
        margin: 25,
        marginBottom: 5,
        padding: 10
    },
    usuario: {
        alignSelf: 'flex-start',
        fontFamily: 'Courier',
        fontSize: 14,
        padding: 10,
        color: 'rgb(234,252,255)'
    },
    descripcion: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 12,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: 155,
        justifyContent: 'center',
        color: 'rgb(51, 74, 82)'
    },
    inferior: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },  
    likesSeccion: {
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10
    },
    comentariosSeccion: {
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10
    },
    textito: {
        fontSize: 11,
        color: 'rgb(234,252,255)',
        marginTop: 5
    },
    comentario: {
        fontSize: 30
    },
    photo: {
        height: '40vh',
        width: '40vw',
        borderColor: 'rgb(234,252,255)',
        borderWidth: 5
    },
    lista: {
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        fontSize: 12,
        margin: 4,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8
    },
    borrar: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default Post;