import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase'

class Post extends Component{

    constructor(props){
        super(props)
        this.state = {
            likes: this.props.postData.data.likes.length,
            comments: '',
            like: false,
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
            likes: this.state.likes + 1,
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
            likes: this.state.likes - 1,
            like: false,
        })
    })
        
        .catch(e => console.log(e))
}
}

export default Post;