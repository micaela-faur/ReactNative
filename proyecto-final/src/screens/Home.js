// importamos react
import React, {Component} from 'react';

// cosas de firebase
import {db, auth} from '../firebase/config';

// componentes de react 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image, ActivityIndicator} from 'react-native'; 

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
        db.collection('posteos').orderBy('creaedAt' , 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( oneDoc => {
                    posteos.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })
                this.setState({
                    posteos: posteos
                })
            }
        )
    }



    render(){
        return(
            <View style={style.contenedor} > 
                <Text> Posteos </Text>
                { this.state.posteos.length > 0 ? 
                <Flatlist 
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
    }
})


export default Home; 