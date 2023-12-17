import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'

import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import BasketScreen from './src/screens/BasketScreen';
import PreparingOrderScreen from './src/screens/PreparingOrderScreen';
import Deliveryscreen from './src/screens/Deliveryscreen';
import { store } from './store';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurant' component={RestaurantScreen} />
          <Stack.Screen name='Delivery' component={Deliveryscreen} 
            options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }}
          />
          <Stack.Screen name='Basket' component={BasketScreen} 
            options={{
              presentation: 'modal',
              headerShown: false
            }}
          />
          <Stack.Screen name='PreparingOrder' component={PreparingOrderScreen} 
            options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}