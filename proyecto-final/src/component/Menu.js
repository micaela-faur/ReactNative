// estructura base de un componente con estado 
import React, {Component} from 'react'; 

// componentes de navegacion
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 

// importacion de iconos 
import {FontAwesome} from '@expo/vector-icons'; 

// importamos screens
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import Search from '../screens/Search';
import { TabActions } from '@react-navigation/native';

// guardar la ejecuccion de createBottomTabNavigator
const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }


// sirve para navegar entre las sceens 

    render(){
        return(
            <Tab.Navigator>  

                <Tab.Screen
                    name= 'Home' // nombre para identificar 
                    component= {Home} //nombre de la screen a la que queres navegar 
                    options= {{tabBarIcon: () => <FontAwesome name='home' size={24} color='black' />}}
                />
                <Tab.Screen 
                    name='Search' // nombre para identificar
                    component= {Search} // nombre de ka screen a la que queres navegar
                    options={{ tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }}
                /> 
                <Tab.Screen
                    name= 'Profile' // nombre para identificar 
                    component= {Profile} //nombre de la screen a la que queres navegar 
                    options= {{tabBarIcon: () => <FontAwesome name='photo' size={24} color='black' />}}
                    initialParams= {{logout: () => this.props.route.params.logout()}}
                />
                <Tab.Screen
                    name= 'NewPost' // nombre para identificar 
                    component= {NewPost} //nombre de la screen a la que queres navegar 
                    options= {{tabBarIcon: () => <FontAwesome name='user' size={24} color='black' />}}
                />

            </Tab.Navigator>
        )
    }
}


export default Menu; 

