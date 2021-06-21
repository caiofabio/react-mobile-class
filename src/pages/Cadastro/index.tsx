import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InputTextField from '../../components';
import LoginService from '../../services/api-service';
import { useNavigation } from '@react-navigation/core';
export default function Cadastro() {
  const [ address, setAdress ] = React.useState('');
  const [ age, setAge ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ name, setName ] = React.useState('');
  const [ password, setTPassword ] = React.useState('');
  const navigation = useNavigation();

  function goLogin() {
    navigation.navigate('Login');
  }

  function handleSave() {
    if (name === undefined || name.trim() === '') {
        alert('Nome é obrigatório!');
        return;
    }
    if (address === undefined || address.trim() === '') {
        alert('Telefone é obrigatório!');
        return;
    }
    if (age === undefined || age.trim() === '') {
        alert('Fuso Horário é obrigatório!');
        return;
    }
    if (email === undefined || email.trim() === '') {
      alert('Fuso Horário é obrigatório!');
      return;
    }
    if (password === undefined || password.trim() === '') {
      alert('Fuso Horário é obrigatório!');
      return;
    }

    LoginService.post("user/customer/add", 
    {
      'address': address,
      'age': age,
      'email': email,
      'name': name,
      'userPassword': password
    }
   ,{
     "headers": {
       'Content-Type': 'application/json'
     }
   })
     .then((response) => {
      alert('Usuario Cadastrado com Sucesso!!!');
      goLogin()/*console.log(response.data)*/
     })
     .catch((err) => {
       console.error("ops! ocorreu um erro" + err);
       alert('Dados invalidos favor reenviar.');
     }); 
  }
  return (
    <View>
      <InputTextField label="Nome" onChange={setName} />
      <InputTextField label="Idade" onChange={setAge} />
      <InputTextField label="Endereço" onChange={setAdress} />
      <InputTextField label="E-mail" onChange={setEmail} />
      <InputTextField label="Senha" onChange={setTPassword} />

      <Button title='Salvar' onPress={handleSave} />
    </View>
  );
}