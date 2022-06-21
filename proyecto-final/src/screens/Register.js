// importamos react y componentes
import React, {Component} from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Flatlist, Image} from 'react-native'; 
import {db, auth} from '../firebase/config'



class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: " ", 
            userName: " ", 
            password: " " 
        }
    }



    render(){
        console.log(this.props);
        
        return(
            <View style={styles.contenedor}>

                <Text style={styles.titulo} > Registrate aqui: </Text>
                <View style={styles.formContenedor}> 
                    <TextInput 
                        style={styles.formulario}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText={text => this.setState({email: text})}
                    />

                    <TextInput 
                        style={styles.formulario}
                        keyboardType='default'
                        placeholder='user-name'
                        onChangeText={text => this.setState({userName: text})}
                    />

                    <TextInput  
                        style={styles.formulario}
                        keyboardType='default'
                        placeholder='password'
                        secureTextEntry= {true}
                        onChangeText={text => this.setState({password: text})}
                    />

                    <TouchableOpacity style={styles.boton}  onPress={()=> this.props.register(this.state.email, this.state.password)}>
                        <Text style={styles.textoBoton} > Registrar </Text>
                    </TouchableOpacity>
                    <Text>El error es: {this.props.errores}</Text> 
                    <TouchableOpacity style={styles.boton} onPress={ ()=>this.props.navigation.navigate('Login') }>
                        <Text style={styles.textoBoton} >Ya estoy registrada</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        )
    }

}

const styles = StyleSheet.create({
    formulario: {
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
    contenedor:{
        paddingHorizontal: 10,
        backgroundColor: '#E2C5EB',
        height: '100%', 
        alignItems: 'center'
    }, 
    formContenedor:{
        backgroundColor: 'white',
        boxShadow: 'rgb(80 80 80) 0px 0px 9px 9px',
        margin: 50, 
        padding:10
    }, 
    textoBoton:{
        color: '#fff',
    }, 
    titulo:{
        marginTop: 20, 
        fontSize: 30
    }
})




export default Register;