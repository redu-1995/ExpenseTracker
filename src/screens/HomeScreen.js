import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

// 1. Import your modular UI elements
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';

// 2. Import the database source file directly
import { dummyExpenses } from '../data/expenses';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* App brand details top layer */}
      <Header />
      
      {/* The balance engine calculates totals directly from the data file */}
      <BalanceCard transactions={dummyExpenses} />

      {/* The future FilterBar and ExpenseList components will be placed here */}
      <View style={styles.listPlaceholder} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listPlaceholder: {
    flex: 1,
  },
});