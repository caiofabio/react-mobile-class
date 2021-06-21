import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import LoginPage from '../pages/Login';
import UserPage from '../pages/Cadastro';
import ProductListPage from '../pages/ListaProdutos';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
      
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Cadastro" component={UserPage} />
                <Stack.Screen name="Lista de Produtos" component={ProductListPage} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
