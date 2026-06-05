import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function FilterBar({ selectedFilter, onSelectFilter }){
    categories = ['All', 'Food', 'Transport', 'Bills', 'Rent', 'Income']

    return(
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle = {StyleSheet.scrollContainer}        
        >
         { categories.map((category)=> {
            const isActive = selectedFilter === category

            return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.7}
                  onPress = {()=> onSelectFilters(category)}
                  style={[
              styles.pillButton,
              isActive && styles.activePillButton
            ]}
                >
                    <Text style={[
                        style.pillText,isActive &&
                        styles.activePillText
                    ]}> 
                       {category}
                    </Text>
                </TouchableOpacity>
            )
         })}
        </ScrollView>
    )
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
    backgroundColor: '#FFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    
    // Subtle shadow for unselected pills
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activePillButton: {
    backgroundColor: '#1E1E24', // Matches your BalanceCard theme
    borderColor: '#1E1E24',
    
    // Deeper shadow for active pill
    shadowColor: '#1E1E24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7D8491',
  },
  activePillText: {
    color: '#FFF',
  },
});