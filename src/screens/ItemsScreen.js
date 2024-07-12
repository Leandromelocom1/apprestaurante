import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { OrderContext } from '../context/OrderContext';

const ItemsScreen = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const { items, addItem } = useContext(OrderContext);

  const handleAddItem = () => {
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: parseFloat(itemPrice), image: 'https://via.placeholder.com/150' };
      addItem(newItem);
      setItemName('');
      setItemPrice('');
    } else {
      Alert.alert('Error', 'Please enter both name and price of the item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Items to Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#ccc"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        placeholderTextColor="#ccc"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7ED321',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ItemsScreen;
