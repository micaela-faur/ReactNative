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
            <View style={style.contenedor}>
                <Text style={style.titulo} > Login </Text>
                <View style={style.contenedorForm} > 
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

            </View>

        )
    }

}


const style = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        backgroundColor: '#E2C5EB',
        height: '100%', 
        alignItems: 'center'
    }, 
    titulo:{
        marginTop: 20, 
        fontSize: 30
    }, 
    campo:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2, 
        padding: 10,
        margin: 20, 
    }, 
    boton:{
        borderRadius: 2, 
        padding: 3, 
        backgroundColor: 'green', 
        margin: 10, 
        textAlign: 'center'
    }, 
    textoBoton:{
        color: '#fff',
    }, 
    contenedorForm:{
        backgroundColor: 'white',
        boxShadow: 'rgb(80 80 80) 0px 0px 9px 9px',
        margin: 50, 
        padding:10
    }, 

})

export default Login;