// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            cantDeLikes: this.props.dataPost.data.likes.lemght,
            myLike: false,
        }
    }
    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true
            })
        }
    }


    agregarLike(){
        db.collection('posteos')
        .doc(this.props.dataPost.id)
        .update({
           likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
        })
        .then(()=>this.setState({
            cantDeLikes: this.state.cantDeLikes + 1,
            myLike: true
        }))
        .catch(error => console.log (error))
    }
    borrandoLike(){
        db.collection('posteos')
        .doc(this.props.dataPost.id)
        .update({
           likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 
        })
        .then(()=>this.setState({
            cantDeLikes: this.state.cantDeLikes - 1,
            myLike: false
        }))
        .catch(error => console.log (error))
    }
    render(){
        return(
         <View style={style.contenedor}>
            <Text> Posteo de: {this.props.dataPost.data.owner} </Text>
            <Text>Descripcion: {this.props.dataPost.data.description} </Text>
            <Text>Likes: {this.state.cantDeLikes} </Text>
            {
                this.state.myLike ?
                <TouchableOpacity onPress={()=>this.deslike()}> 
                    <Text> Deslikear</Text>
                </TouchableOpacity>    :       
                <TouchableOpacity onPress={()=> this.likear()}> 
                <Text> Likear</Text>
            </TouchableOpacity> 
            }
            <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})}>
                <Text>Ver comentarios</Text>
            </TouchableOpacity>


         </View>
        )
    }
}

const style = StyleSheet.create({
    contenedor: {
       
    },
    like:{

    },
    deslike:{

    }
})

export default Post;