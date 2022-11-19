import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase'

class Post extends Component{

    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.data.likes.length,
            comentarios: '',
            like: false,
            userFoto:'',
        }
    }

componentDidMount(){
    if(this.props.postData.data.likes.includes(auth.currentUser.email)){
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

addComment() {
    let oneComment = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        commentText: this.state.comentarios

    }
    db.collection('posts').doc(this.props.postData.id).update({
        Comentario: firebase.firestore.FieldValue.arrayUnion(oneComment)
    })
        .then(() => {
            this.setState({
                comentario: ''
            })
        })
        .catch(e => console.log(e))
}


render() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.photo}
                source={{ foto : this.props.postData.data.photo }}
                resizeMode='cover'
            />
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {mail: this.state.usuario.data.owner})}>
                                <Image 
                                    style={styles.profile}
                                    source={{uri:this.state.userFoto}}
                                    resizeMode='auto' 
                                />
                            </TouchableOpacity>

            {this.state.like ?
                <TouchableOpacity onPress={() => this.unlike()}>
                    <Text style={styles.data} >Dislike</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.like()}>
                    <Text style={styles.data}>Like</Text>
                </TouchableOpacity>
            }

            <Text style={styles.data}> {this.state.cantidadDeLikes} likes </Text>
            <Text style={styles.data}>{this.props.postData.data.textoPosteo}</Text> 


            <View>
                <TextInput style={styles.input} keyboardType='default'
                    placeholder='Escribí tu comentario'
                    onChangeText={(texto) => { this.setState({ comentario: texto }) }}
                    value={this.state.comentario}
                />
                <TouchableOpacity onPress={() => this.funcionComentar()}>
                    <Text style={styles.button} >Comentar</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    )
}
}

export default Post;