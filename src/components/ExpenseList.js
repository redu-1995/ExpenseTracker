import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

// 1. Destructure onItemPress from props
export default function ExpenseList({ data, onItemPress }) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No transactions recorded here yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      // 2. Pass onItemPress down to the individual item row
      renderItem={({ item }) => (
        <ExpenseItem 
          item={item} 
          onPress={() => onItemPress && onItemPress(item)} 
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
});