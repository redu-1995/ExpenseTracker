import React from 'react';
import HomeScreen from './src/screens/HomeScreen'; // Import the main home screen

export default function App() {
  // At this early stage, we render HomeScreen directly. 
  // Later, your AppNavigator will sit here to handle multi-screen transitions!
  return <HomeScreen />;
}