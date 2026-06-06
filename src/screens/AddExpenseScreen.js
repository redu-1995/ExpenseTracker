import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';

export default function AddExpenseScreen() {
  const handleBackAction = () => {
    console.log('Pop back to HomeScreen');
    // Navigation wireframe will replace this log shortly!
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header Core Anchor */}
      <ScreenHeader title="Add Transaction" onBack={handleBackAction} />

      {/* 2. Scrollable Body Content Placeholder */}
      <View style={styles.formContainer}>
        <Text style={styles.placeholderText}>
          Form Controls (Title, Amount, Type) go here next!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 15,
  },
});