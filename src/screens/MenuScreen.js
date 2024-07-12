import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderContext } from '../context/OrderContext';
import { ProductContext } from '../context/ProductContext';

const MenuScreen = ({ route, navigation }) => {
  const { tableId = 0, tableName = 'Unknown Table' } = route.params || {};
  const { addOrder } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState([]);

  const handleAddToOrder = (item) => {
    setOrder([...order, item]);
  };

  const handleRemoveFromOrder = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const handleSendOrder = () => {
    addOrder({ tableId, tableName, items: order });
    Alert.alert('Order sent', `Order for ${tableName} has been sent successfully`);
    setOrder([]);
  };

  const handleLogoff = () => {
    Alert.alert('Logged off');
    navigation.navigate('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>
        {item.price !== undefined ? `$${item.price.toFixed(2)}` : 'Price not available'}
      </Text>
      <Pressable style={styles.addButton} onPress={() => handleAddToOrder(item)}>
        <Text style={styles.addButtonText}>Add to Order</Text>
      </Pressable>
    </View>
  );

  const renderOrderItem = (item, index) => (
    <View key={index} style={styles.orderItem}>
      <Text style={styles.orderItemText}>{item.name} - ${item.price ? item.price.toFixed(2) : 'N/A'}</Text>
      <Pressable onPress={() => handleRemoveFromOrder(index)}>
        <Ionicons name="trash" size={20} color="red" />
      </Pressable>
    </View>
  );

  const calculateTotalAmount = (order) => {
    return order.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Tables')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>{tableName}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search From Here"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable onPress={handleLogoff}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Kitchen')}>
          <Ionicons name="restaurant" size={28} color="#fff" />
        </Pressable>
      </View>
      <FlatList
        data={Array.isArray(products) ? products.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>Current Order</Text>
        <ScrollView style={styles.orderList}>
          {order.map((item, index) => renderOrderItem(item, index))}
        </ScrollView>
        <Text style={styles.totalAmount}>Total: ${calculateTotalAmount(order)}</Text>
        <Pressable style={styles.sendButton} onPress={handleSendOrder}>
          <Text style={styles.sendButtonText}>Send Order</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#444',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  foodName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodPrice: {
    color: '#7ED321',
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7ED321',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
  },
  orderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderItemText: {
    color: '#fff',
    fontSize: 16,
  },
  totalAmount: {
    color: '#7ED321',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#7ED321',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
