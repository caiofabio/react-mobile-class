import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, FlatList, Alert, TouchableOpacity, } from 'react-native';
import LoginService from '../../services/login';
import { ProductList } from '../../models/productList'
import { styles } from './style';

//export default function ProductListPage({ navigation }: any) {
const ProductListPage = ({ navigation }: any) => {
  
//function ProductListPage() {//OK COM EXPORT NO FIM
//export default function ProductListPage() {
    //const [ productLists, setProductList ] = React.useState<ProductList[]>();
    const [products, setProducts] = useState(Object);

    LoginService.get("product/list", 
    {
     "headers": {
       'Content-Type': 'application/json'
     }
    })
    .then((response) => {
      setProducts(response.data);
      console.log(response.data);
      /*const products: ProductList[] = response.data;
      console.log('Data: ', products);
      const initial = new Map<Number, ProductList>();
      
      const map = products.reduce((map, product) => {
        map.set(product.id, product);
        return map;
      }, initial)

      console.log('Data: ', map);
      console.log('DataMAP: ', Array.from(map.keys()));

      const list = Array.from(map.values());
      list.sort((a, b) => {
        return a.id - b.id;
      });
      console.log('List: ', list);//lista ordenada
      alert('Lista retornou com sucesso!!!');
      setProductList(list);*/
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Dados invalidos favor reenviar.');
    });
    
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
