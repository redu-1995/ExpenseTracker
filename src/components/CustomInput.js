import React from 'react'
import { StyleSheet, Text, View, TextInput,multiline } from 'react-native'
 export default function CustomInput ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    ultiline = false, 
   numberOfLines = 1
 })
 {
    return (
    <View style={styles.inputContainer}>
      {/* Dynamic Input Label */}
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      
      {/* Core Controlled TextInput */}
      <TextInput
        style={[
          styles.textInput, 
          multiline && styles.textArea
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'} // Aligns multiline text to the top on Android
      />
    </View>
  );
 }
 const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E24',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E1E24',
    
    // Smooth, premium layout drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    height: 100, // Provides vertical space for optional descriptive text fields
    paddingTop: 12,
  },
});