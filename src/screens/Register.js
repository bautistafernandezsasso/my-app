import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth , db} from "../firebase/config"
import Camara from "../components/Camara/Camara"

class Register extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            nombreusuario: "",
            description: "",
            foto: "",
            error:'',
            showCamera: false
        }
    }

    registrar(email, password, nombreusuario, description, foto){
        auth.createUserWithEmailAndPassword(email, password)
        .then( resp => {
            db.collection("users").add({
                owner: email,
                username: nombreusuario,
                bio: description,
                foto: foto,
                createdAt: Date.now()
            })
            .then(()=>{
                this.setState({
                    email: "",
                    password: "",
                    nombreusuario: "",
                    description: "",
                    foto: "",
                    error: "",
                    showCamera: false
                })
                this.props.navigation.navigate("Login")
            }).catch(error =>console.log(error))

        }).catch( error => this.setState({error:error.message}))
    }
    
    onImageUpload(url){
        this.setState({
            foto: url,
            showCamera: false
    
        })
      }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Text>{this.state.error}</Text>
                <Text style={styles.title}>Register</Text>
                <TextInput style={styles.text}
                    placeholder='Escribi tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput style={styles.text}
                    placeholder='Escribi tu password'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TextInput style={styles.text}
                    placeholder='Escribi un username'
                    onChangeText={text => this.setState({nombreusuario: text})}
                    value={this.state.nombreusuario}
                />

                <TextInput style={styles.text}
                    placeholder='Escribi tu descripcion '
                    onChangeText={text => this.setState({description: text})}
                    value={this.state.description}
                />

              

{
                        this.state.showCamera ?
                        <View>
                            <Camara onImageUpload={url => this.onImageUpload(url)} style={{width: "15vh", heigth: "15vh"}}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera: true})}>
                            <Text style={styles.text}>Subir foto de perfil</Text>
                        </TouchableOpacity> 
                    }

            { this.state.email =="" || this.state.nombreusuario =="" || this.state.password == "" ? 
            <View>
                <TouchableOpacity>
                    <Text style={styles.text2}>REGISTRATE</Text>
                </TouchableOpacity>
            </View>
            :
                <View>
                    <TouchableOpacity onPress={()=> this.registrar(this.state.email, this.state.password, this.state.nombreusuario, this.state.description, this.state.foto)}>
                        <Text style={styles.text2}>REGISTRATE</Text>
                    </TouchableOpacity>
                </View>
            }
                <View>
                    <Text>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text style={styles.text2}>Logueate</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

export default Register