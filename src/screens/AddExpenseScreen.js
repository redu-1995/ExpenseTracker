import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import CustomInput from '../components/CustomInput';
export default function AddExpenseScreen() {
  const [title,setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const handleBackAction = () => {
    console.log('Pop back to HomeScreen');
    // Navigation wireframe will replace this log shortly!
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header Core Anchor */}
      <ScreenHeader title="Add Transaction" onBack={handleBackAction} />

      {/* 2. Scrollable Body Content Placeholder */}
    <ScrollView contentContainerStyle={styles.formBody} showsVerticalScrollIndicator={false}>
        
        {/* Section 2: Title Input Form Field */}
        <CustomInput 
          label="Title"
          placeholder="Enter title (e.g., Lunch, Salary, Taxi)" 
          value={title}
          onChangeText={(text) => setTitle(text)} // Dynamically binds input changes to state
        />

        {/* Subsequent form items (Amount, Type, etc.) will sit right here */}
    <CustomInput 
          label="Amount"
          placeholder="0.00" 
          keyboardType="numeric" // ⚡ Triggers clean number pad layout instead of text letters
          value={amount}
          onChangeText={(value) => setAmount(value)} // Binds digits to local execution state
        />
      </ScrollView>
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