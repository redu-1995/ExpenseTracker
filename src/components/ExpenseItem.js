import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ExpenseItem({ item }) {
  const isIncome = item.amount > 0;

  return (
    <View style={styles.itemCard}>
      <View style={styles.leftContent}>
        {/* Category Icon Wrapper */}
        <View style={styles.iconWrapper}>
          <Feather name={item.icon || 'tag'} size={18} color="#1E1E24" />
        </View>
        
        {/* Text Stack */}
        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>

      {/* Amount Display */}
      <Text style={[
        styles.amountText, 
        { color: isIncome ? '#4CD964' : '#1E1E24' }
      ]}>
        {isIncome ? `+${item.amount.toLocaleString()}` : `-${Math.abs(item.amount).toLocaleString()}`} ETB
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    
    // Smooth layout shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E24',
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
  },
});