import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import CustomInput from '../components/CustomInput'; // Reusing your input component

export default function ExpenseDetailScreen({ route, navigation }) {
  // Extract data parameters from navigation route
  const { expense, onDelete, onUpdate } = route.params;

  // 1. Local states to manage inline editing mode toggle and input forms
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(Math.abs(expense.amount).toString());
  const [notes, setNotes] = useState(expense.notes || '');

  // Helper dictionary mapping categories to aesthetic visual icons
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Food': return 'shopping-cart';
      case 'Transport': return 'truck';
      case 'Salary': return 'dollar-sign';
      default: return 'credit-card';
    }
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you absolutely sure you want to delete this transaction from your logs?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            if (onDelete) onDelete(expense.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  // 2. Core update execution handler
  const handleSaveChanges = () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Missing Info', 'Please enter a valid Title and Amount.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }

    // Preserve the original sign of the transaction (Income vs Expense)
    const signedAmount = expense.amount < 0 ? -numericAmount : numericAmount;

    const updatedTransaction = {
      ...expense,
      title: title.trim(),
      amount: signedAmount,
      notes: notes.trim(),
    };

    // Trigger state persistence update if callback bridge is supplied
    if (onUpdate) {
      onUpdate(updatedTransaction);
    } else {
      Alert.alert("Notice", "Update callback function wireframe missing from HomeScreen routing parameters.");
    }

    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    // Revert inputs back to their verified saved states
    setTitle(expense.title);
    setAmount(Math.abs(expense.amount).toString());
    setNotes(expense.notes || '');
    setIsEditing(false);
  };

  const isExpense = expense.amount < 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title={isEditing ? "Edit Details" : "Expense Details"} 
        onBack={() => isEditing ? handleCancelEditing() : navigation.goBack()} 
      />

      <ScrollView contentContainerStyle={styles.contentBody} keyboardShouldPersistTaps="handled">
        
        {/* HERO ICON PROFILE SUMMARY SECTION (Hidden during active editing to save space) */}
        {!isEditing && (
          <View style={styles.heroCard}>
            <View style={[styles.iconWrapper, { backgroundColor: isExpense ? 'rgba(255, 59, 48, 0.08)' : 'rgba(76, 217, 100, 0.08)' }]}>
              <Feather name={getCategoryIcon(expense.category)} size={32} color={isExpense ? '#FF3B30' : '#4CD964'} />
            </View>
            <Text style={styles.mainTitle}>{title}</Text>
            <Text style={[styles.mainAmount, { color: isExpense ? '#FF3B30' : '#4CD964' }]}>
              {isExpense ? '-' : '+'}{parseFloat(amount)} ETB
            </Text>
          </View>
        )}

        {!isEditing && <View style={styles.divider} />}

        {/* METADATA FORM INTERFACE FIELD GROUPS */}
        {isEditing ? (
          <View style={styles.editFormContainer}>
            <CustomInput label="Title" value={title} onChangeText={setTitle} placeholder="Enter title" />
            <CustomInput label="Amount (ETB)" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" />
            <CustomInput label="Notes (optional)" value={notes} onChangeText={setNotes} multiline numberOfLines={3} placeholder="Add transaction details..." />
          </View>
        ) : (
          <View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{expense.category}</Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>June 9, 2026</Text> 
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Notes</Text>
              <Text style={styles.notesValue}>
                {notes || "No notes appended to this transaction item."}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        {/* DYNAMIC BUTTON ACTIONS WORKSPACE */}
        <View style={styles.actionRow}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7} onPress={handleCancelEditing}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} activeOpacity={0.7} onPress={handleSaveChanges}>
                <Feather name="check" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7} onPress={() => setIsEditing(true)}>
                <Feather name="edit-2" size={16} color="#1E1E24" style={{ marginRight: 8 }} />
                <Text style={styles.editButtonText}>Edit Expense</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} activeOpacity={0.7} onPress={handleDeletePress}>
                <Feather name="trash-2" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.deleteButtonText}>Delete Expense</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  contentBody: { padding: 24, flexGrow: 1 },
  heroCard: { alignItems: 'center', marginVertical: 15 },
  iconWrapper: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  mainTitle: { fontSize: 22, fontWeight: '700', color: '#1E1E24', marginBottom: 6 },
  mainAmount: { fontSize: 26, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#EAEAEA', marginVertical: 20, width: '100%' },
  editFormContainer: { width: '100%' },
  infoGroup: { marginBottom: 20 },
  infoLabel: { fontSize: 13, fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 },
  infoValue: { fontSize: 16, fontWeight: '500', color: '#1E1E24' },
  notesValue: { fontSize: 15, color: '#4B5563', lineHeight: 22 },
  actionRow: { marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 },
  editButton: { flex: 0.48, borderWidth: 1.5, borderColor: '#1E1E24', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  editButtonText: { color: '#1E1E24', fontWeight: '700', fontSize: 15 },
  deleteButton: { flex: 0.48, backgroundColor: '#FF3B30', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  deleteButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  cancelButton: { flex: 0.48, borderWidth: 1.5, borderColor: '#6B7280', borderRadius: 12, paddingVertical: 14, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { color: '#6B7280', fontWeight: '700', fontSize: 15 },
  saveButton: { flex: 0.48, backgroundColor: '#007AFF', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});