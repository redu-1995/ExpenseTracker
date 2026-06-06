import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import FloatingActionButton from '../components/CustomButton'; 

import { dummyExpenses } from '../data/expenses';

export default function HomeScreen( ) {
 
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredExpenses = activeFilter === 'All'
    ? dummyExpenses
    : dummyExpenses.filter(item => item.category === activeFilter);

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.screenContainer}>
        {/* 1. Header takes up natural space */}
        <Header />
        
        {/* 2. Card takes up natural space */}
        <BalanceCard transactions={dummyExpenses} />
        
        {/* ⚡ THE FIX: Wrap the FilterBar in a dedicated non-flexible View wrapper ⚡ */}
        <View style={styles.filterWrapper}>
          <FilterBar 
            selectedFilter={activeFilter} 
            onSelectFilter={setActiveFilter} 
          />
        </View>

        {/* 3. The list takes up ALL remaining layout space via flex: 1 */}
        <View style={styles.listWrapper}>
          <ExpenseList data={filteredExpenses} />
        </View>
      </SafeAreaView>

      <FloatingActionButton onPress={() => console.log('Add clicked')} />
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
  // Allocates precise layout limits for the category list
  filterWrapper: {
    height: 90, // Locks the heights so nothing squeezes it out of existence
    justifyContent: 'center',
    zIndex: 10, // Keeps it stacked safely on top layer layouts
  },
  // Allocates the rest of the display real estate exclusively for lists
  listWrapper: {
    flex: 1, 
  },
});