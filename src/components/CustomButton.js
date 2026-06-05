import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.fabContainer} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <AntDesign name="plus" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF', // Vibrant classic action blue
    justifyContent: 'center',
    alignItems: 'center',
    
    // Elevate it visually off the background grid
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    
    // Ensures it floats strictly over lists and cards
    zIndex: 999, 
  },
});