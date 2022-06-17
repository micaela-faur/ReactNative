// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// importamos firebase
import firebase from 'firebase';
import { color } from 'react-native-reanimated';

//importamos i
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

import Post from './Post';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            posteos:[],
            email:'',
            quienEs:'',
        }
    }
    
    // Obtenemos info a partir de la búsqueda.
    busqueda(email){ 
        db.collection('posteos').where('owner', '==', email).onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( oneDoc => {
                    posteos.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posteos: posteos,
                    email:'',
                    quienEs:email,
                })
            }
        )

        
    }


    render(){
        
        return(
                <View >
                    <Text style={style.texto}>Posteos del usuario: {this.state.quienEs}</Text>
                    <View style={style.form}>
                        <TextInput 
                            style={style.campo}
                            keyboardType='default'
                            placeholder='email a buscar...'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})}
                        />  
                        <TouchableOpacity
                            style={style.boton} 
                            onPress={()=>this.busqueda(this.state.email)}
                            disabled= {this.state.email == '' ? true : false }
                            >
                            <Text><FontAwesome name="search" size={24} color="black" /></Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                        data={this.state.posteos}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const style = StyleSheet.create({
    contenedor:{
        flex:1,
        padding:10,
        backgroundColor: '#E2C5EB',
    },
    form:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
    },
    campo:{
        borderColor: '#cdcd',
        borderWidth: 2,
        borderRadius: 2,
        padding:5,
        marginBottom:8,
        width:'70%',
        marginBottom: 5,
        lineHeight:100,
    },
    boton: {
        borderRadius: 2,
        padding:3,
        backgroundColor: '#cdcd',
        width:'29%',
        textAlign: 'center',
    },
    textoBoton:{
        color: '#fff'
    },
    texto:{
        textAlign:'center',
        padding:'1%'
    }
})

export default Search;