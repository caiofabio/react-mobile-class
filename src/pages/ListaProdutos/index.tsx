import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, FlatList, Alert, TouchableOpacity, } from 'react-native';
import LoginService from '../../services/api-service';
import { styles } from './style';

const ProductListPage = ({ navigation }: any) => {
    const [products, setProducts] = useState(Object);

    useEffect(() => {
      LoginService.get("product/list", 
      {
      "headers": {
        'Content-Type': 'application/json'
      }
      })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        alert('Dados invalidos favor reenviar.');
      });
    }, []);
    
    return (
    <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(product) => product.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text style={styles.producttitle}>{item.name}</Text>
                        <Text>Fabricante: {item.factory.name}</Text>
                        <View style={styles.priceSection}>
                            <Text>Preço: </Text>
                            <Text style={styles.price}>
                                R$ {item.price.toFixed(2).replace('.', ',')}
                            </Text>
                        </View>
                        <Text>Quantidade em Estoque: {item.amount}</Text>
                    </View>
                )}
            />
      </View>
    );
}

export default ProductListPage;
