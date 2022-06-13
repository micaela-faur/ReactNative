// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

class NewPost extends Component{
      constructor(props){
          super(props)
          this.state={
              comentarios: [],
              likes:[],
              descripcion: ''
          }
      }

      guardarPosteos(){
          db.collection('posteos').add({
              createdAt: Date.now(),
              owner: auth.currentUser.email,
              descripcion: this.state.descripcion,
              likes:[],
              comentarios:[]
          })
          .then(response => this.setState({
              descripcion:''
          },
          ()=> this.props.navigation.navigate('Home')))
          .catch(error => console.log(error))
      }
      render(){
          return(
              <View style= {style.contenedor}>
            <Text  style= {style.titulo}>Nuevo Posteo </Text>
            <TextInput  
            style= {style.campo} 
            keyboardType='default'
            placeholder='descripcion'
            onChangeText={text => this.setState({descripcion: text})}
            multiline
            />
            <TouchableOpacity  style= {style.boton} onPress={()=> this.guardarPosteos()}>
                <Text  style= {style.textoBoton}>Guardar Posteo</Text>
            </TouchableOpacity>
              </View>
          )
      }
}


const style = StyleSheet.create({
    contenedor:{
paddingHorizontal: 10,
marginTop: 10
    },
    titulo:{
marginBottom: 20
    },
    campo:{
borderColor: '#dcdcdc',
borderWidth: 1,
borderRadius: 2,
padding: 3,
marginBottom: 8,
    },
    boton:{
borderRadius: 2,
padding: 3,
backgroundColor: 'green'
    },
    textoBoton:{
color: '#fff'
    }
})


export default NewPost;

