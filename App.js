import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TableScreen from './src/screens/TableScreen';
import MenuScreen from './src/screens/MenuScreen';
import KitchenScreen from './src/screens/KitchenScreen';
import ItemsScreen from './src/screens/ItemsScreen';
import { OrderProvider } from './src/context/OrderContext';
import { ProductProvider } from './src/context/ProductContext'; // Adicionado

const Stack = createStackNavigator();

const App = () => {
  return (
    <OrderProvider>
      <ProductProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Tables"
              component={TableScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Kitchen"
              component={KitchenScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Items"
              component={ItemsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </OrderProvider>
  );
};

export default App;
