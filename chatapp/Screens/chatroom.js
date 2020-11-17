import React, {useEffect, useState, useRef} from "react"
import {Text,View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions} from "react-native"
import {ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import {MaterialIcons} from "@expo/vector-icons"
import {socket} from "./login"

const ChatRoom = ({route}) => {
    const scrollViewRef = useRef()
    const name = route.params.username
    const messages = route.params.messages
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState([])
    
    useEffect(()=>{
        setAllMessages(messages)
        socket.on("send all messages", data=>{
            setAllMessages(data)
        })
        return () => {
            socket.off("send all messages")
        }
    },[])

    const sendMessage = () => {
        socket.emit("send message", {message, name})
        setMessage("")
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAwareView} behavior={Platform.OS==="ios" ? "padding": null} keyboardVerticalOffset={64}>
            <ScrollView style={styles.messagesList} ref={scrollViewRef}
            onContentSizeChange={(contentWidth, contentHeight)=>{scrollViewRef.current.scrollToEnd({animated:true})}}>
                <Text style={{backgroundColor:"white",marginVertical:20,textAlign:"center",marginHorizontal:30,borderRadius:10,overflow:"hidden",paddingVertical:3}}>Messages are end to end encrypted.</Text>
                    {allMessages.map((item,index)=>{
                        return(
                        <View key={index} style={{alignSelf:item.name === name ? "flex-end" : "flex-start",
                        backgroundColor:"red",
                        maxWidth:Dimensions.get("screen").width - 40,
                        paddingHorizontal:5,
                        paddingVertical:4,
                        borderRadius:4,
                        overflow:"hidden",
                        marginVertical:10
                        }}>
                            {item.name === name ? <Text style={styles.username}>You</Text> : <Text style={styles.username}>{item.name}</Text>}
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                        )
                    })}
            </ScrollView>
            <View style={styles.sendView}>
                <TextInput
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                style={styles.messageInput}
                placeholder="Type Message ..."
                value={message}
                onChangeText={(text)=>setMessage(text)}
                onEndEditing={()=> message ? sendMessage() : null}
                />
                <TouchableOpacity style={{backgroundColor:"red",flex:1, justifyContent:"center",paddingHorizontal:5}} onPress={()=> message ? sendMessage() : null}>
                    <MaterialIcons name="send" size={35} color="white"/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardAwareView:{
        flex:1,
        backgroundColor:"lightgrey",
    },
    messagesList:{
        flex:1,
        padding:10,
        paddingTop:0
    },
    sendView:{
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center"
    },
    messageInput:{
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingRight:5,
        fontSize:18,
        height:45,
        flex:1
    },
    username:{
        color:"white",
        paddingRight:25,
        fontSize:16,
        fontWeight:"600"
    },
    message:{
        color:"white",
        marginTop:3,
        paddingLeft:1
    }
})

export default ChatRoom