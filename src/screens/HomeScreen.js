import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Header from '../components/Header';
import FloatingActionButton from '../components/CustomButton'
import BalanceCard from '../components/BalanceCard';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList'; // 1. Import the list component

import { dummyExpenses } from '../data/expenses';

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Math logic feeding the conditional layout array
  const filteredExpenses = activeFilter === 'All'
    ? dummyExpenses
    : dummyExpenses.filter(item => item.category === activeFilter);

  const handlePressAdd = () => {
    console.log('Navigate to AddExpenseScreen!');
    // This is where your future navigation link will trigger!
  };
return (
    // Wrap the entire screen view in a relative container 
    // so the absolute FAB positions itself perfectly relative to the viewport edges
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.screenContainer}>
        <Header />
        <BalanceCard transactions={dummyExpenses} />
        
        <FilterBar 
          selectedFilter={activeFilter} 
          onSelectFilter={setActiveFilter} 
        />

        <ExpenseList data={filteredExpenses} />
      </SafeAreaView>

      {/* Render the Floating Action Button right here */}
      <FloatingActionButton onPress={handlePressAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  screenContainer: {
    flex: 1,
  },
});