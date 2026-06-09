import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Or whatever icon package you're using

// 1. Destructure the onPress prop
export default function ExpenseItem({ item, onPress }) {
  const isExpense = item.amount < 0;
  const displayAmount = Math.abs(item.amount);

  return (
    // 2. Wrap the root container view in a TouchableOpacity
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.7} onPress={onPress}>
      
      {/* Your current card contents (Icon, Title, Amount, etc.) goes here */}
      <View style={styles.leftRowSection}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      
      <Text style={[styles.amountText, { color: isExpense ? '#FF3B30' : '#4CD964' }]}>
        {isExpense ? '-' : '+'}{displayAmount} ETB
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  leftRowSection: {
    flexDirection: 'column',
  },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#1E1E24' },
  itemCategory: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  amountText: { fontSize: 16, fontWeight: '700' },
});