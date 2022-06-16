// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, ActivityIndicator} from 'react-native'; 

// screens 
import Post from './Post'



class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posteos: [], 
        }
    }

    componentDidMount(){
        db.collection('posteos').orderBy('createdAt' , 'desc').onSnapshot(
            docs => {
                console.log(docs)
                let posteos = [];
                docs.forEach( oneDoc => {
                    posteos.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })
                console.log(posteos);
                this.setState({
                    posteos: posteos

                },
                console.log(this.state.posteos))

            }
        )
    }



    render(){
        return(
            <View style={style.contenedor} > 
                <Text style = {style.titulo}> Posteos </Text>
                { this.state.posteos.length > 0 ? 
                <FlatList 
                    style= {style.posteos}
                    data= {this.state.posteos}
                    keyExtractor= {posteos => posteos.id} 
                    renderItem= {({item}) => <Post dataPost={item} {...this.props} /> }
                
                /> :
                <ActivityIndicator size= 'large' color= 'green' /> 
            }
            </View>
        )
    }



}

const style = StyleSheet.create({
    contenedor: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#E2C5EB',
    },
    titulo:{
        marginTop: 10, 
        fontSize: 30
    },
    boton: {
    borderRadius: 4, 
    padding:7, 
    backgroundColor: '#cdcdcd', 
    margin: 20, 
    textAlign: 'center'
   }, 
   posteos:{
       backgroundColor: 'white', 
       boxShadow: 'rgb(80 80 80) 0px 0px 9px 9px', 
       width: '60%', 
       margin: 30
   }
})


export default Home; 