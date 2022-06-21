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
                    // userName: postProfile[0].data.userName,
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
                    <Text style={style.cuadroTexto}>
                        <Text style={style.texto} > Mail:  </Text> 
                        <Text> {auth.currentUser.email} </Text>
                    </Text>

                    <Text style={style.cuadroTexto}> 
                        <Text style={style.texto} > Ultima fecha de ingreso: </Text>
                        <Text> {auth.currentUser.metadata.lastSignInTime} </Text> 
                    </Text>
                    
                    {/* <Text>Nombre: {auth.currentUser.displayName}</Text> */}
                    <Text style={style.cuadroTexto}> 
                        <Text style={style.texto} > Publicaciones:  </Text>
                        <Text> {this.state.posteos.length} </Text>
                    </Text>

                    {this.state.posteos.length > 0 ? 
                        <View style= {style.contenedorFlat}> 
                            <FlatList 
                            style= {style.flatlist}
                            data= {this.state.posteos}
                            keyExtractor= {(posteos) => posteos.id.toString()}
                            renderItem= {({item})=> <Post dataPost={item}{...this.props} />}
                            />
                        </View> 
                    : 
                    <View> 
                        <Text>No tenes ninguna publicacion</Text>
                    </View> 
                    }

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
       alignItems: 'center' , 
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
    flatlist:{
        height: 280, 
        width: 480, 
        backgroundColor: 'white', 
        boxShadow: 'rgb(80 80 80) 0px 0px 9px 9px',
    }, 
    contenedorFlat:{
        alignItems: 'center', 
    }, 
    texto: {
        fontWeight: 'bold'
    }, 
    cuadroTexto:{
        padding: 3
    }, 
     
})

export default Profile;

