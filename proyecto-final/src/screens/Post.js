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
            cantDeLikes: 0,
            myLike: false,
        }
    }
    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
                cantDeLikes: this.props.dataPost.data.likes.length
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
            cantDeLikes: this.props.dataPost.data.likes.length,
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
            myLike: false,
            cantDeLikes: this.props.dataPost.data.likes.length
        }))
        .catch(error => console.log (error))
    }
    render(){
        return(
         <View style={style.contenedor}>
            <Text> Posteo de: {this.props.dataPost.data.owner} </Text>
            <Text>Descripcion: {this.props.dataPost.data.descripcion} </Text>
            <Text>Likes: {this.state.cantDeLikes} </Text>
            {
                this.state.myLike ?
                <TouchableOpacity onPress={()=>this.borrandoLike()}> 
                    <Text> Deslikear</Text>
                </TouchableOpacity>    :       
                <TouchableOpacity onPress={()=> this.agregarLike()}> 
                <Text> Likear</Text>
            </TouchableOpacity> 
            }
            <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id, name: this.props.dataPost.owner})}>
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