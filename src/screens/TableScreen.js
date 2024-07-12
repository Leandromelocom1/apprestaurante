// Exemplo de componente que navega para MenuScreen
import React from 'react';
import { View, Text, Button } from 'react-native';

const TableScreen = ({ navigation }) => {
  const handleNavigateToMenu = () => {
    navigation.navigate('Menu', { tableId: 1, tableName: 'Table 1' });
  };

  return (
    <View>
      <Text>Table Screen</Text>
      <Button title="Go to Menu" onPress={handleNavigateToMenu} />
    </View>
  );
};

export default TableScreen;
