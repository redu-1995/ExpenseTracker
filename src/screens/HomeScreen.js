import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import Header from '../components/Header';
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

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Header />
      <BalanceCard transactions={dummyExpenses} />
      
      <FilterBar 
        selectedFilter={activeFilter} 
        onSelectFilter={setActiveFilter} 
      />

      {/* 2. Drop the dynamic list engine down here! */}
      <ExpenseList data={filteredExpenses} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});