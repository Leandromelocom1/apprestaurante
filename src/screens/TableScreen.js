import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tables = [
  { id: '1', name: 'Table 1' },
  { id: '2', name: 'Table 2' },
  { id: '3', name: 'Table 3' },
  { id: '4', name: 'Table 4' },
];

const TableScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Table</Text>
      <FlatList
        data={tables}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tableButton}
            onPress={() => navigation.navigate('Menu', { tableId: item.id, tableName: item.name })}
          >
            <Text style={styles.tableButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  tableButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#7ED321',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tableButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TableScreen;
