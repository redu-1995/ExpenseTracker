import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function BalanceCard({ transactions = [] }) {
  // 1. Calculate Total Income
  const totalIncome = transactions
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  // 2. Calculate Total Expenses
  const totalExpenses = transactions
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  // 3. Calculate Remaining Balance
  const remainingBalance = totalIncome - totalExpenses;

  // Helper function to format currency nicely
  const formatCurrency = (value) => {
    return `${value.toLocaleString()} ETB`;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Remaining Balance Section */}
      <View style={styles.mainBalanceGroup}>
        <Text style={styles.cardLabel}>Remaining Balance</Text>
        <Text style={[
          styles.balanceAmount, 
          { color: remainingBalance >= 0 ? '#FFFFFF' : '#FF4D4D' }
        ]}>
          {formatCurrency(remainingBalance)}
        </Text>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Breakdown Row: Income & Expenses */}
      <View style={styles.row}>
        {/* Income Stat */}
        <View style={styles.statColumn}>
          <View style={styles.iconLabelRow}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(76, 217, 100, 0.15)' }]}>
              <AntDesign name="arrowup" size={14} color="#4CD964" />
            </View>
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <Text style={styles.incomeAmount}>{formatCurrency(totalIncome)}</Text>
        </View>

        {/* Expenses Stat */}
        <View style={styles.statColumn}>
          <View style={styles.iconLabelRow}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255, 59, 48, 0.15)' }]}>
              <AntDesign name="arrowdown" size={14} color="#FF3B30" />
            </View>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <Text style={styles.expenseAmount}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1E24', // Modern dark slate color
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 24,
    borderRadius: 24,
    
    // Smooth elevation layout
    shadowColor: '#1E1E24',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  mainBalanceGroup: {
    marginBottom: 16,
  },
  cardLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statColumn: {
    flex: 1,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  incomeAmount: {
    color: '#4CD964', // Green
    fontSize: 16,
    fontWeight: '700',
  },
  expenseAmount: {
    color: '#FF3B30', // Red
    fontSize: 16,
    fontWeight: '700',
  },
});