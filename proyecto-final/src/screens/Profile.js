// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image, ActivityIndicator} from 'react-native'; 


class Profile extends Component{
      constructor(props){
          super(props)
          this.state={
              
          }
      }
      

      render(){
          console.log(auth.currentUser);
          return(
              <View style ={style.fondo}>

                <View>
                    <Text>Mail: {auth.currentUser.email}</Text>
                    <Text>name: {this.props.name}</Text>
                </View>

                  <View style ={style.contenedor}>
                      <TouchableOpacity style ={style.boton} onPress= {()=> this.props.route.params.logout()} >
                      <Text style ={style.textoBoton} > Cerrar Sesion </Text>
                    </TouchableOpacity> 
                  </View>
              </View>
          )
      }
}

const style = StyleSheet.create({
    boton:{
       alignItems: 'center' 
    },
    textoBoton: {
        borderRadius: 4, 
        padding:7, 
        backgroundColor: 'red', 
        margin: 20, 
        textAlign: 'center'
    }, 
    fondo:{
        backgroundColor: '#E2C5EB',
    }, 
     
})

export default Profile;

