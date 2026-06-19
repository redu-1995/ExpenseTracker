import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import FloatingActionButton from '../components/CustomButton'; 

import { dummyExpenses } from '../data/expenses';

const STORAGE_KEY = '@expense_tracker_transactions';

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true); // Prevents flash of empty screen

  // 1. Read stored files from the device disk when app first opens
  useEffect(() => {
    loadStoredExpenses();
  }, []);

  const loadStoredExpenses = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue !== null) {
        // Parse string data back into active JavaScript objects
        setExpenses(JSON.parse(jsonValue));
      } else {
        // Fallback to defaults on the very first fresh launch
        setExpenses(dummyExpenses);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyExpenses));
      }
    } catch (error) {
      console.error('Failed to pull records from hardware storage.', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Modified append callback to also save changes straight to disk hardware
  const handleAddNewExpense = async (newTx) => {
    try {
      const updatedExpenses = [...expenses, newTx];
      setExpenses(updatedExpenses); // Update UI state
      
      // Commit string configuration array directly onto phone storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Failed to commit transaction record update to storage line.', error);
    }
  };
  const handleRemoveExpense = async (targetId) => {
    try {
      // Filter out the selected transaction entry by its random string reference token ID
      const updatedExpenses = expenses.filter(item => item.id !== targetId);
      setExpenses(updatedExpenses); // Live update UI stack layout
      
      // Rewrite string file cleanly onto physical hardware disk drive
      await AsyncStorage.setItem('@expense_tracker_transactions', JSON.stringify(updatedExpenses));
    } catch (err) {
      console.error('Failed to eliminate entry profile from storage key tracks.', err);
    }
  };
   const handleUpdateExpense = async (updatedTx) => {
  try {
    // Map across records and replace matching object fields by matching target ID array parameters
    const updatedExpenses = expenses.map(item => item.id === updatedTx.id ? updatedTx : item);
    setExpenses(updatedExpenses); // Live dashboard UI component update
    
    // Commit edits permanently to phone flash storage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Failed to commit modified row profile update changes.', error);
  }
};
  // 2. MODIFIED NAVIGATION REDIRECT ROUTING TRIGGER FOR CLICKS
  const handleItemPress = (clickedExpenseItem) => {
    navigation.navigate('ExpenseDetail', {
      expense: clickedExpenseItem,
      onDelete: handleRemoveExpense, // Passes the removal method target parameter straight to detail page
      onUpdate: handleUpdateExpense // Passes the update method target parameter straight to detail page
    });
  };

  const handlePressAdd = () => {
    navigation.navigate('AddExpense', { onSave: handleAddNewExpense }); 
  };

  const filteredExpenses = activeFilter === 'All'
    ? expenses
    : expenses.filter(item => item.category === activeFilter);

  // Show a clean loading wheel spinner while disk IO operations read tracks
  if (isLoading) {
    return (
      <View style={[styles.rootContainer, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#1E1E24" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.screenContainer}>
        <Header />
        <BalanceCard transactions={expenses} />
        
        <View style={styles.filterWrapper}>
          <FilterBar selectedFilter={activeFilter} onSelectFilter={setActiveFilter} />
        </View>

        <View style={styles.listWrapper}>
          {/* ⚡ PASS THE CLICK FUNCTION PROP straight down into your custom list component rendering framework ⚡ */}
         <ExpenseList data={filteredExpenses} onItemPress={handleItemPress} />
        </View>
      </SafeAreaView>

      <FloatingActionButton onPress={handlePressAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  screenContainer: { 
    flex: 1,
    // ⚡ CRITICAL FIX: Ensures elements never bleed into top phone icons
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  filterWrapper: { 
    height: 90, 
    justifyContent: 'center', 
    zIndex: 10 
  },
  listWrapper: {
    flex: 1,
    backgroundColor: 'transparent', 
    zIndex: 1, 
    // ⚡ CRITICAL FIX: Adds space at the bottom so the list items are never blocked by buttons or phone docks
    paddingBottom: 80, 
  },
});