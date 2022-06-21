// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

// importamos la camara
import MyCamera from '../component/MyCamera';

class NewPost extends Component{
      constructor(props){
          super(props)
          this.state={
              comentarios: [],
              likes:[],
              descripcion: '',
              mostrarCamara: true,
              url: ''
          }
      }
      // guardar la url
      onImageUpload(url){
       this.setState({
           url: url,
           mostrarCamara: false
       })
      }

      guardarPosteos(){
          db.collection('posteos').add({
              createdAt: Date.now(),
              owner: auth.currentUser.email,
              descripcion: this.state.descripcion,
              likes:[],
              comentarios:[],
              url: this.state.url,
          })
          .then(response => this.setState({
              descripcion:'',
              mostrarCamara: true
          },
          ()=> this.props.navigation.navigate('Home')))
          .catch(error => console.log(error))
      }
      render(){
          return(
            <View style= {style.contenedor}>
                  { this.state.mostrarCamara ? 
                   <MyCamera style={style.camara} onImageUpload={url => this.onImageUpload(url)}
                  /> 
                  : 
                <View style= {style.fondoDescripcion}> 
                    <View style= {style.campoDescripcion}> 
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
                </View> }
            </View>
          )
      }
}


const style = StyleSheet.create({
    contenedor:{
        paddingHorizontal: 10,
        marginTop: 10,
        height: 400,
        
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
    },
    camara:{
        height: 400
    },
    campoDescripcion:{
        backgroundColor: 'white',
        boxShadow: 'rgb(80 80 80) 0px 0px 9px 9px',
        margin: 50, 
        padding:10
    },
    fondoDescripcion:{
        backgroundColor: '#E2C5EB',
        height: '100%'
    }
})


export default NewPost;

