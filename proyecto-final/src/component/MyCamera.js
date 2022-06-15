// estructura base de un componente con estado 
import React, {Component} from 'react'; 

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

//importamos la camara
import {Camera} from 'expo-camera';

// importamos el storage de firebase
import {db, storage} from '../firebase/config';

// importamos iconos
import { Entypo } from '@expo/vector-icons'; 

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state={
            permisos: false,
            mostrarCamara: true,
            url: ''
        } 
        this.metodosDeCamera= '' //preguntar  
    }
    // apenas entras a la pag de la camaera te pide permisos, hace que salte una alerta de permitir acceder a la camara
      componentDidMount(){
         Camera.requestCameraPermissionsAsync()
         .then(()=> this.setState({
             permisos: true
         }))
         .catch(error => console.log(error))
      }
      // hay que obtener la uurl temporal para guardarla en el estado
      sacarFoto(){
        this.metodosDeCamera.takePictureAsync() //preguntar y porque el photo
        .then(photo => {
            this.setState({
                url: photo.uri,
                mostrarCamara: false 
            })
        }) .catch(error => console.log(error))
      }
      // guardamos la url
      guardarFoto(){
        fetch(this.state.url)
        .then(response => response.blob()) //preguuntar
        .then( image => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`); //preguntar
            ref.put(image)
            .then(()=> {
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
      }
      
      eliminar(){


      }


    render(){

        return(
            <View style = {style.camara}>
              { this.state.permisos ? 
                this.state.mostrarCamara ?   
            
               <View style = {style.camara}> 
                   <Camera
                     style  = {style.camara}
                     type= {Camera.Constants.Type.front}
                     ref = {metodosDeCamera => this.metodosDeCamera = metodosDeCamera}
                   />
                   <TouchableOpacity style = {style.boton} onPress = {()=> this.sacarFoto()}>
                       <Text><Entypo name="camera" size={24} color="black" /></Text>
                   </TouchableOpacity>
               </View>
               :
               <View style = {style.camara}> 
                   <Image
                   style = {style.preview}
                   source = {{uri: this.state.url}}
                   resizeMode = 'cover'
                    />
                    <TouchableOpacity style = {style.boton} onPress = { () => this.guardarFoto()}>
                        <Text>Guardar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {style.boton} onPress = { () => this.eliminar()}>
                        <Text>Eliminar Foto</Text>
                    </TouchableOpacity>
               </View>
               :
               <Text>No tengo permisos de camara</Text>
           
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    camara:{
        height: '70%'
    },
    boton: {
        borderColor: '#dcdcdc',
        borderWidth: 3,
        padding: 15,
        borderRadius: 4,
        marginTop: 20,
        textAlign: 'center'
    },
    preview:{
        height: '80%'
    }

})


export default MyCamera;
