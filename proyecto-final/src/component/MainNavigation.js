// estructura base de un componente con estado 
import React, {Component} from 'react'; 

// firebase 
import {db, auth} from '../firebase/config';

// importamos las navegaciones 
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// guardamos la ejecucion de stack
const Stack = createNativeStackNavigator(); 

// importamos las screens 
import Login from '../screens/Login'; 
import Register from '../screens/Register'; 
import Menu from './Menu';
import Comentarios from '../screens/Comentarios';

class MainNavigation extends Component{
    constructor(props){
        super(props);
        this.state={
            login: false, 
            registerError: ''
        }
    }

    componentDidMount(){ // chequea si el usuario esta logueado, lo hace apenas se carga la pagina
        auth.onAuthStateChanged(user => { // si el usario esta logueado, el estado hay que cambiarlo a true
            if (user){
                this.setState({
                    login: true
                })
            }
        })
    }

    login(mail, pass){     // loguea en firebase por lo que cambia el estado de login a true 
        auth.signInWithEmailAndPassword(mail,pass)
        .then(response => this.setState({
            login: true
        }))
        .catch(error => console.log(error))

    }

    register(mail,pass,userName){   // firebase registra por lo que cambia el login a true, se pasa al componente register como metodo, colocar el metodo de registracion de firebase
        auth.createUserWithEmailAndPassword(mail,pass)
        .then(responseRegister => {console.log(responseRegister)}) // guarda el documento de la coleccion del usuario 
        db.collection('usuarios').add({  // creamos la coleccion de los usuarios 
            email: mail, 
            userName: userName,
            createdAt: Date.now()
        })
        .then(responseUser => this.setState({
            login: true,
        }))
        .catch(error=> console.log(error))  // se usa para mandarle el error al usuario 
        .catch(error => {console.log(error); this.setState({
            registerError: error.message,
        })})
        

    }

    logout(){ // se pasa como metodo a profile ya que se usa ahi
        auth.signOut()
        .then(responser => this.setState({
            login: false,
        }))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {this.state.login ? 
                    <Stack.Group> 
                        <Stack.Screen
                            name= "Menu"
                            component= { Menu }
                            options= {{hedearShown: false}}
                            initialParams= {{logout: () => this.logout()}}
                        /> 
                        <Stack.Screen 
                            name= 'Comentarios'
                            component= {Comentarios}
                        />
                    </Stack.Group> : 

                    <Stack.Group>
                        <Stack.Screen 
                            name= 'Login'
                            component= {Login}
                            options= {{hedearShown: false}}
                            initialParams= {{login: (mail,pass) => this.login(mail,pass)}}
                        />
                        <Stack.Screen
                            name= 'Register'
                            options = {{hedearShown: false}}
                            initialParams= {{register: (mail,pass, userName) => this.register(mail,pass, userName)}}
                            children= {(navigationProps) => <Register errores= {this.state.registerError} {...navigationProps} />}
                        />
                    </Stack.Group>   
                    
                }

                </Stack.Navigator>
            </NavigationContainer>
        )
    }



}





export default MainNavigation; 