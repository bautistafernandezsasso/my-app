import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "",
            comentarios: [],
        }
    }

    componentDidMount() {
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(
            docs => {
                this.setState({
                    comentarios: docs.data().comentarios
                })
            })
    };

    addComment() {
        db.collection('posts')
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({ author: auth.currentUser.email, commentText: this.state.comentario, createdAt: Date.now() })
            })
            .then(() => {
                this.setState({
                    comentario: "",
                })
            })
    }
    

    render() {
        return (
            <View style={styles.container}>

                <View >
                    {this.state.comentarios == 0 ?

                        <View>
                            <Text> Aún no hay comentarios. </Text>
                        </View>
                        :
                        <FlatList
                            data={this.state.comentarios}
                            keyExtractor={unComentario => unComentario.createdAt.toString()}
                            renderItem={({ item }) => <Text style={styles.comentarios}>{item.author}: {item.commentText}</Text>}
                        />
                    }
                    <TextInput
                        placeholder='Agregue un comentario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario}
                        style={styles.texto}
                    />
                    {this.state.comentario == "" ?
                        <Text></Text>
                        :
                        <TouchableOpacity onPress={() => this.addComment()}>
                            <Text style = {styles.boton}>Subir comentario</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(16, 146, 201)',
        flex: 1
    },
   
    comentarios: {
        backgroundColor: 'rgb(16, 146, 201)',
        fontSize: 14,
        margin: 8,
        textAlign: 'left',
        padding: 8
    },
    texto: {
        backgroundColor: 'rgb(16, 146, 201)',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8,
        borderColor: 'rgb(16, 146, 201)',
        borderWidth: 2
    },
    boton: {
        fontSize: 14,
        margin: 10,
        backgroundColor: 'rgb(16, 146, 201)',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        borderColor: 'rgb(16, 146, 201)',
        borderWidth: 2,
    }
})

export default Comments;