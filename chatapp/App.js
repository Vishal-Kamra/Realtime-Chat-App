import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Login from "./Screens/login"
import ChatRoom from "./Screens/chatroom"

const stack = createStackNavigator()

const App = () => {
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName="Chat Room - Login" screenOptions={
                {
                    headerStyle:{
                        backgroundColor:"red"
                    },
                    headerTitleStyle:{
                        color:"white"
                    },
                    headerBackTitleStyle:{
                        color:"white"
                    },
                    headerTintColor:"white"
                }
            }>
                <stack.Screen name="Chat Room - Login" component={Login} options={
                    {
                        headerShown:false
                    }
                }/>
                <stack.Screen name="Chat Room" component={ChatRoom} options={{
                    headerBackTitle:"Logout"
                }} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default App