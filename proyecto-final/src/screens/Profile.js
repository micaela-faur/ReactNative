// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// importamos componente post
import Post from '../screens/Post';


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos:[], 
            userName: '', 
        }
    }
    componentDidMount(){
        db.collection('posteos')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(
            (docs) => {
                let datosPosteo = [];
                docs.forEach(doc => {
                    datosPosteo.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: datosPosteo, 
                    loading: false
                })
            }
        )
        db.collection('usuarios')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(
            (docs) => {
                let postProfile = [];
                docs.forEach((doc)=> {
                    postProfile.push({
                        id: doc.id, 
                        data: doc.data(), 
                    });
                });
                console.log(docs)
                this.setState({
                    userName: postProfile[0].data.userName,
                    loading: false
                });
            }
        )
    }   

      render(){
        //   console.log(auth.currentUser);
          return(
              <View style ={style.fondo}>

                <View>
                    <Text>Mail: {auth.currentUser.email}</Text>
                    <Text>Ultima fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>
                    <Text>Publicaciones: {this.state.posteos.length} </Text>
                    {this.state.posteos.length > 0 ? 
                        <FlatList 
                           data= {this.state.posteos}
                           keyExtractor= {(posteos) => posteos.id.toString()}
                           renderItem= {({item})=> <Post posteos={item}{...this.props} />}
                        />
                    : 
                    <View> 
                        <Text>No tenes ninguna publicacion</Text>
                    </View> 
                    }
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

