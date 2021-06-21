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
import LoginService from '../../services/api-service';
import InputTextField from '../../components';
 
const Login = ({ navigation }: any) => {
//export default function Login() {
  const [ login, setEmail ] = React.useState('');
  const [ password, setPassw ] = React.useState('');
  const navigationIn = useNavigation();
  let fail = true;
 
  function goNewUser() {
    navigationIn.navigate('Cadastro');
  }

  function goProductList() {
    navigationIn.navigate('Lista de Produtos');
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

//secureTextEntry={true}
  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />
      <View>
        <InputTextField label="Login" onChange={setEmail} secure={false}/>
      </View>
 
      <View>
        <InputTextField label="Senha" onChange={setPassw} secure={true}/>
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

export default Login;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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