// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

class NewPost extends Component{
      constructor(props){
          super(props)
          this.state={
              comentarios: [],
              textoDelComent:''
          }
      }
      render(){
          return(
              <View>

              </View>
          )
      }
}

export default NewPost;
