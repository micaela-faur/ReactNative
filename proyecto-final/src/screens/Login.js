//impotamos react y componente 
import React, {Component} from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image} from 'react-native'; 

// firebase
import {db, auth} from '../firebase/config'



class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: " ",  
            password: " " 
        }
    }



    render(){
        return(
            <View>
                <Text> Login </Text>
                <TextInput   // formulario de login 
                    style={style.campo}
                    keyboardType= 'default'
                    placeholder='email'
                    onChangeText={ text => this.setState({email: text})}
                    /> 
                <TextInput 
                    style={style.campo}
                    keyboardType= 'default'
                    placeholder='password'
                    onChangeText={ text => this.setState({ password: text})}
                    secureTextEntry= {true}
                /> 

                <TouchableOpacity style={style.boton} onPress={()=> this.props.route.params.login(this.state.email, this.state.password)} >
                    <Text style={style.textoBoton}> Ingresar </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.boton} onPress={()=> this.props.navigation.navigate('Register')} >
                    <Text style={style.textoBoton} > No tengo cuenta </Text>
                </TouchableOpacity>

            </View>

        )
    }

}


const style = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 10,
    }, 
    titulo:{
        marginBottom: 20, 
    }, 
    campo:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2, 
        padding: 3,
        marginBottom: 8, 
    }, 
    boton:{
        borderRadius: 2, 
        padding: 3, 
        backgroundColor: 'green'
    }, 
    textoBoton:{
        color: '#fff',
    }
})

export default Login;