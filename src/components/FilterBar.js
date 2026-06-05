import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function FilterBar({ selectedFilter, onSelectFilter }) {
  // 1. Display Categories
  const categories = ['All', 'Food', 'Transport', 'Bills', 'Rent', 'Income'];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category) => {
        const isActive = selectedFilter === category;
        
        return (
         <TouchableOpacity
            key={category}
            onPress={() => onSelectFilter(category)}
            style={[
                styles.pillButton,
                isActive && styles.activePillButton // Overrides background
            ]}
            >
            <Text style={[
                styles.pillText,
                isActive && styles.activePillText   // Overrides text color to white
            ]}>
                {category}
            </Text>
            </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
pillButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',       // Light background for unselected pills
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  activePillButton: {
    backgroundColor: '#1E1E24',    // Dark background for selected "All" pill
    borderColor: '#1E1E24',
  },
  
  // ⚡ FIX THE TEXT COLOR CONTRAST HERE ⚡
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7D8491',              // Dark grey text so it stands out on white pills
  },
  activePillText: {
    color: '#FFFFFF',              // Pure white text so it pops out on the dark "All" pill
  },
});