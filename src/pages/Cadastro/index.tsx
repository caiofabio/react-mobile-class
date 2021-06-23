import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InputTextField from '../../components';
import LoginService from '../../services/api-service';
import { useNavigation } from '@react-navigation/core';

export default function Cadastro({ navigation }: any) {
  const [ address, setAdress ] = React.useState('');
  const [ age, setAge ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ name, setName ] = React.useState('');
  const [ password, setTPassword ] = React.useState('');
  const navigations = useNavigation();

  function goLogin() {
    navigations.navigate('Login');
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

    if ( parseInt(age) < 17 ) {
      alert('Idade deve ser superior a 17')
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
      console.log(response)
      alert('Usuario Cadastrado com Sucesso!!!');
      goLogin()/*console.log(response.data)*/
     })
     .catch((err) => {
       console.log(err)
       //console.error("ops! ocorreu um erro" + err);
       alert('Dados invalidos favor reenviar.');

     }); 
  }
  return (
    <View>
      <InputTextField label="Nome" onChange={setName} secure={false} />
      <InputTextField label="Idade" onChange={setAge} secure={false}/>
      <InputTextField label="Endereço" onChange={setAdress} secure={false}/>
      <InputTextField label="E-mail" onChange={setEmail} secure={false}/>
      <InputTextField label="Senha" onChange={setTPassword} secure={false}/>

      <Button title='Salva' onPress={handleSave} />
    </View>
  );
}