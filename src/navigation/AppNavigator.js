import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your custom screen views
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // Disables default native header bars
        animation: 'slide_from_right', // Smooth, premium layout transitions
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      {/* <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} /> */}
    </Stack.Navigator>
  );
}