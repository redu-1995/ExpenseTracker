import React from 'react';
import HomeScreen from './src/screens/HomeScreen'; 
import { NavigationContainer } from '@react-navigation/native';// Import the main home screen
import AppNavigator from './src/navigation/AppNavigator';
export default function App() {
  // At this early stage, we render HomeScreen directly. 
  // Later, your AppNavigator will sit here to handle multi-screen transitions!
  return (
    <NavigationContainer>
     <AppNavigator />
    </NavigationContainer>
  );
}