import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, KeyboardAvoidingView, StyleSheet, Image, Platform, TextInput, TouchableOpacity } from 'react-native';

import api from '../service/api';

import logo from "../assets/logo.png"

export default function Login({ navigation }) {

   const [ user, setUser] = useState('');

   useEffect(() => {
       AsyncStorage.getItem('user').then(() => {
           if (user) {
               navigation.navigate('Main', { user})
           }
       })
   }, [])

   async function handlerLogin() {
      const response = await api.post("/devs", { username: user });

      const { _id } = response.data
      
      await AsyncStorage.setItem("user", _id);
      
      navigation.navigate('Main', {user: _id });
   } 

   return (
    <KeyboardAvoidingView 
        behavior="padding"
        enabled={Platform.OS === "ios"}
        style={styles.container}>
        <Image source={logo} />

        <TextInput 
        style={styles.input}
        autoCapitalize="none"
        autoCorrect= {false}
        placeholder="Seu usuário no GitHub"
        placeholderTextColor="#999"
        value={user}
        onChangeText={setUser}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={handlerLogin}
        >
            <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
        
        
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f5f5f5",
        padding: Platform.OS === 'android' ? 0 : 30 
    },

    input:{
        height:46,
        alignSelf:"stretch",
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        marginTop: 40,
        paddingHorizontal: 15,
    },

    button: {
        height:46,
        alignSelf:"stretch",
        backgroundColor:"#df4723",
        borderRadius: 4,
        marginTop: 10,
        justifyContent:"center",
        alignItems:"center"
    },

    textButton:{
        color:"#fff",
        fontSize: 16,
        fontWeight:"bold"
    }
})