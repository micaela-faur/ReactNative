// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';

// importamos iconos
import { AntDesign } from '@expo/vector-icons';






class Comentarios extends Component{
      constructor(props){
          super(props)
          this.state={
              comentarios: [],
              textoComentarios:''
          }
      }

      componentDidMount(){
          // obtiene los datos del posteo para despues renderizarlos. Usaremos el id que recibimos por parametros
        
        db.collection('posteos')
        .doc(this.props.route.params.id)
        .onSnapshot( doc => {
            this.setState({
                comentarios: doc.data().comentarios
            })
        })
        }

    agregarComentarios(){
        db.collection('posteos')
        .doc(this.props.route.params.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text: this.state.textoComentarios,
                createdAt: Date.now()
            })

        })
        .then(()=> {
            this.setState({
                textoComentarios: ''
            })
        })
    }
    
    
      render(){
          return(
              <View style={style.contenedor} >
                <Text style={style.titulo}> Comentarios </Text>
                {/*  Renderizamos la lista de comentarios */ }
               { this.state.comentarios != '' ?
            <FlatList
            style= {style.campo}
            data={this.state.comentarios}
            keyExtractor= {posteos => posteos.createdAt}
            renderItem= {({item})=> 
            <View>
                <Text><AntDesign name="user" size={24} color="black" />{item.owner} </Text> 
                <Text>Comentó: {item.text} </Text>
            </View>
             }
            /> :
            
            <Text style={style.titulo} > No hay comentarios</Text>
            }

             {/*  creamos un formulario para cargar comentarios */ }
            <TextInput 
            style= {style.campo}
            keyboardType= "default"
            placeholder='Agregar un comentario'
            onChangeText={text => this.setState({ textoComentarios: text})}
            value = {this.state.textoComentarios}
            />
        
            {
                this.state.textoComentarios == '' ? <View> 
                <TouchableOpacity style={style.boton} >
                <Text style={style.textoBoton}> Comentar </Text>
            </TouchableOpacity>
            <Text style={style.error} > El comentario esta vacio. Por favor, ingrese su comentario</Text> 
            </View> :
            
            <TouchableOpacity style={style.boton} onPress={()=> this.agregarComentarios()}>
                <Text style={style.textoBoton}> Comentar </Text>
            </TouchableOpacity> }
    
               
            </View>
          )
      }
}

const style = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 10
    },
    titulo: {
        marginBottom:20
    },
    campo:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8
    },
    boton: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green'

    },
    textoBoton:{
        color:'#fff'
    },
    error:{
        color: 'red'
    }

})


export default Comentarios;

