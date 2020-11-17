import React, {useState, useEffect} from "react"
import {Text, StyleSheet, View, TextInput, Dimensions, Image, KeyboardAvoidingView} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
const io = require("socket.io-client")

export const socket = io("https://16e6b7884f1d.ngrok.io",{
    transports:["websocket"]
})

const Login = ({navigation}) => {
    const [name, setName] = useState("")
    const [placeholder, setPlaceholder] = useState("Enter Your Name")

    const userRegister = () => {
        socket.emit("user", name)
        setName("")
        socket.on("user success", bool=>{
            if(bool){
                setPlaceholder("Enter Your Name")
                socket.on("all messages", data=>{
                    navigation.navigate("Chat Room",{username:name, messages:data})
                })
            }else{
                socket.on("user error", err=>{
                    setPlaceholder(err)
                    setName("")
                })
            }
        })
    }

    return(
        <KeyboardAvoidingView style={styles.parentContainer}>
            <Image source={require("../assets/loginBg.jpg")} style={styles.bg} />
            <View style={styles.container}>
                <Text style={styles.title}>Let's Connect With The World</Text>
                <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                style={styles.input}
                placeholder={placeholder}
                value={name}
                onChangeText={(text)=>setName(text)}
                onEndEditing={()=>userRegister()}
                />
                <TouchableOpacity onPress={()=>{userRegister()}}>
                    <Text style={styles.loginBtn}>Connect</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    parentContainer:{
        flex:1
    },
    bg:{
        height:Dimensions.get("screen").height,
        width:Dimensions.get("screen").width,
        position:"absolute",
        zIndex:-1
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:20,
        marginTop:-100,
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    title:{
        fontSize:25,
        textAlign:"center",
        color:"white",
        fontWeight:"600"
    },
    input:{
        fontSize:20,
        width: Dimensions.get("window").width - 40,
        borderRadius:7,
        overflow:"hidden",
        height:45,
        backgroundColor:"#fafafa",
        textAlign:"center",
        paddingHorizontal:10,
        marginVertical:35
    },
    loginBtn:{
        backgroundColor:"red",
        width: Dimensions.get("window").width - 40,
        textAlign:"center",
        fontSize:23,
        paddingVertical:9,
        color:"white",
        borderRadius:7,
        overflow:"hidden"
    }
})

export default Login