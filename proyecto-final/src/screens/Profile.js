// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

class Profile extends Component{
      constructor(props){
          super(props)
          this.state={
              
          }
      }
      

      render(){
          return(
              <View>
                  <TouchableOpacity style ={style.contenedor} onPress= {()=> this.props.route.params.logout()} >
                      <Text style ={style.boton} > Cerrar Sesion </Text>
                    </TouchableOpacity> 
              </View>
          )
      }
}

const style = StyleSheet.create({
    contenedor:{
       alignItems: 'center' 
    },
    boton: {
        borderRadius: 4, 
        padding:7, 
        backgroundColor: 'red', 
        margin: 20, 
        textAlign: 'center'
    }
})

export default Profile;

