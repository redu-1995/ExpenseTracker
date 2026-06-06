import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button Action Target */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#1E1E24" />
      </TouchableOpacity>

      {/* Screen Context Title */}
      <Text style={styles.screenTitle}>{title}</Text>

      {/* Invisible Spacer Box to balance flex layout centering */}
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA', // Seamless match with app background
    borderBottomWidth: 1,
    borderColor: '#EAEAEA', // Subtle boundary separator line
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    
    // Smooth layout tactile shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E24',
    textAlign: 'center',
  },
  spacer: {
    width: 40, // Perfectly mirrors backButton width for immaculate centering
  },
});