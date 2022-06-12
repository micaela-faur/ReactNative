// importamos react y componentes
import React, {Component} from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image} from 'react-native'; 
import {db, auth} from '../firebase/config'



class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: " ", 
            name: " ", 
            password: " " 
        }
    }

    register(mail,pass){
        auth.createUserWithEmailAndPassword(mail,pass)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }


    render(){
        return(
            <View style={styles.contenedor}>

                <Text> Registrate aqui: </Text>

                <TextInput style={styles.formulario}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({email: text})}
                />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='user-name'
                    onChangeText={text => this.setState({name: text})}
                />

                <TextInput  style={styles.boton}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText={text => this.setState({password: text})}
                />

                <TouchableOpacity style={styles.registrar}  onPress={()=> this.register(this.state.email, this.state.password)}>
                    <Text> Registrar </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registrada} onPress={ ()=>this.props.navigation.navigate('Login') }>
                    <Text>Ya estoy registrada</Text>
                </TouchableOpacity>

            </View>
            
        )
    }

}

const styles = StyleSheet.create({
    formulario: {
        padding: 10, 
        margin: 20,
        borderColor: "#ccc", 
    }, 
    input:{
        height: 20, 
        padding: 20,
        borderColor: "#ccc", 
        margin: 10
    }, 
    boton:{
        padding: 10, 
        margin: 20,
        borderColor: "#ccc", 
    }, 
    contenedor:{
        alignItems: "center", 
        margin: 20, 
    }, 
    registrar:{
        padding: 5, 
        margin: 5,
        width: 100,
        backgroundColor: "#D2CECD", 
        textAlign: "center",
    }, 
    registrada:{
        padding: 5, 
        margin: 5,
        width: 150,
        backgroundColor: "#D2CECD", 
        textAlign: "center"
    }
})




export default Register;