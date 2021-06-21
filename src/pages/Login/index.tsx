import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { LoginModel } from '../../models/login';
import LoginService from '../../services/login';
import axios from "axios";
 
export default function Login() {
  const [ login, setEmail ] = React.useState('');
  const [ password, setPassw ] = React.useState('');
  const navigation = useNavigation();
  let fail = true;
 
  function goNewUser() {
    //navigation.navigate('Cadastro');
    navigation.navigate('Lista de Produtos');
  }

  function goProductList() {
    navigation.navigate('Lista de Produtos');
  }

  function handleLogin() {
    if ( login === undefined || login.trim() === '') {
      alert('Email é obrigatorio.');
      return;
    }

    
    if ( password === undefined || password.trim() === '') {
      alert('Senha é obrigatorio.');
      return;
    }

    const loginModel: LoginModel = {
      login, 
      password
    };
    console.log(loginModel);

    LoginService.post("user/login", 
       {
        'login' : login,
        'password' : password
       }
      ,{
        "headers": {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => goProductList()/*console.log(response.data)*/)
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          alert('Usuario/Senha incorreto.');
        }); 
  }


  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="E-mail."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Senha."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setPassw}
        />
      </View>
 
      <TouchableOpacity>
          <Text onPress={goNewUser} style={styles.forgot_button}>Novo Usuario</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#00BFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 35,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00BFFF",
  },
});