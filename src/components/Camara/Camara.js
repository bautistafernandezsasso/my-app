import {Camera} from 'expo-camera'
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase';


class Camara extends Component{

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>{
        this.setState({
            permission: true,
        })
    })
    .catch(e => console.log(e))
}

tomarFoto(){
    this.metodosDeCamara.takePictureAsync()
        .then( photo => {
            this.setState({
                urlTemporal: photo.uri,
                showCamera: false
            })
        })
        .catch( e => console.log(e))
}

guardarFoto(){
    fetch(this.state.photo)
    .then(res => res.blob())
    .then( image => {
        const ref = storage.ref(`photos/${Date.now()}.jpg`);
        ref.put(image) 
        .then(()=> {
            ref.getDownloadURL()
            .then(url => this.props.onImageUpload(url))
        })
    })
    .catch(e => console.log(e))
}

cancelar(){

    this.setState({
        urlTemporal: '',
        showCamera:true 
    })

}

render(){
    return(
        <View>
        {
            this.state.permissions ? 
                this.state.showCamera ?
                <View style={styles.cameraBody}>
                    <Camera
                        style={styles.cameraBody}
                        type = {Camera.Constants.Type.front}
                        ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                    />
                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={()=>this.tomarFoto()}>
                        <Text>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Image 
                        style={styles.preview}
                        source={{uri: this.state.photo}}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.borrarFoto()}>
                        <Text>Rechazar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.guardarFoto()}>
                        <Text>Accept</Text>
                    </TouchableOpacity>
                </View>

            :
                <Text>No permits</Text>
        }
        </View>
    )
}
}

export default Camara