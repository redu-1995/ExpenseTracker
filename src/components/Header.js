import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Built into Expo


export default function Header() {
  // Hardcoded to match your June 2026 requirements, 
  // but can easily be replaced with new Date() logic later.
  const currentMonthYear = "June 2026"; 

  return (
    <View style={styles.headerContainer}>
      {/* App Information Stack */}
      <View style={styles.textGroup}>
        <Text style={styles.appTitle}>Expense Tracker</Text>
        <Text style={styles.dateText}>{currentMonthYear}</Text>
      </View>

      {/* Profile/Settings Interactive Icon */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA', // Matches clean home page background
  },
  textGroup: {
    flexDirection: 'column',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E1E24',
    letterSpacing: -0.5,
  },
  dateText: {
    fontSize: 14,
    color: '#7D8491',
    fontWeight: '500',
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    
    // Subtle premium shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2, 
  },
});