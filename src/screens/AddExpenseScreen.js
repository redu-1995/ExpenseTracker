import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  Alert,
  Platform,  
  StatusBar  
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import CustomInput from '../components/CustomInput';

export default function AddExpenseScreen({ navigation, route }) {
  // Core text and type input states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Expense');
  
  // Category picker states
  const [category, setCategory] = useState('Food');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 📅 Date selector states
  const [selectedDate, setSelectedDate] = useState('2026-06-08'); // Current timeline date anchor
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const expenseCategories = ['Food', 'Transport', 'Bills', 'Rent', 'Shopping', 'Entertainment'];
  const incomeCategories = ['Salary', 'Bonus', 'Freelance', 'Gift'];

  // Hardcoded date tracking configurations
  const availableDates = [
    { label: 'Today (Jun 8)', value: '2026-06-08' },
    { label: 'Yesterday (Jun 7)', value: '2026-06-07' },
    { label: 'Saturday (Jun 6)', value: '2026-06-06' },
    { label: 'Friday (Jun 5)', value: '2026-06-05' },
  ];

  // Automating fallback tags when transaction types shift
  useEffect(() => {
    if (transactionType === 'Expense') {
      setCategory('Food');
    } else {
      setCategory('Salary');
    }
  }, [transactionType]);

  const activeCategoryList = transactionType === 'Expense' ? expenseCategories : incomeCategories;

  // Helper calculation formatter to show readable data tags
  const getDateLabel = (val) => {
    const match = availableDates.find(d => d.value === val);
    return match ? match.label : val;
  };

  // 💾 CORE SUBMISSION AND APPEND ACTION HANDLER
  const handleSaveTransaction = () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Missing Fields', 'Please complete the Title and Amount inputs.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please input a clean positive balance number.');
      return;
    }

    // Creating object map structurally aligned to match data row styles
    const newTransaction = {
      id: Math.random().toString(), 
      title: title.trim(),
      amount: transactionType === 'Expense' ? -parsedAmount : parsedAmount,
      date: selectedDate,
      category: category,
      icon: transactionType === 'Expense' ? 'shopping-cart' : 'dollar-sign'
    };

    // Safely fire route state parameter instructions back to home screen
    if (route.params?.onSave) {
      route.params.onSave(newTransaction);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Add Transaction" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.formBody} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <CustomInput label="Title" placeholder="Enter title" value={title} onChangeText={setTitle} />

        {/* Amount Input */}
        <CustomInput label="Amount" placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} />

        {/* Type Selector (Income/Expense) */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Type</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity 
              style={[styles.radioCard, transactionType === 'Income' && styles.incomeActiveCard]}
              onPress={() => setTransactionType('Income')}
            >
              <View style={[styles.outerCircle, transactionType === 'Income' && styles.incomeOuterCircle]}>
                {transactionType === 'Income' && <View style={[styles.innerCircle, { backgroundColor: '#4CD964' }]} />}
              </View>
              <Text style={[styles.radioText, transactionType === 'Income' && styles.activeRadioText]}>Income</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.radioCard, transactionType === 'Expense' && styles.expenseActiveCard]}
              onPress={() => setTransactionType('Expense')}
            >
              <View style={[styles.outerCircle, transactionType === 'Expense' && styles.expenseOuterCircle]}>
                {transactionType === 'Expense' && <View style={[styles.innerCircle, { backgroundColor: '#FF3B30' }]} />}
              </View>
              <Text style={[styles.radioText, transactionType === 'Expense' && styles.activeRadioText]}>Expense</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Picker Selector */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Category</Text>
          <TouchableOpacity 
            style={styles.pickerSelector} 
            activeOpacity={0.7}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.pickerText}>{category}</Text>
            <Feather name="chevron-down" size={20} color="#7D8491" />
          </TouchableOpacity>
        </View>

        {/* 📅 Date Picker Selector */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Date</Text>
          <TouchableOpacity 
            style={styles.pickerSelector} 
            activeOpacity={0.7}
            onPress={() => setIsDateModalVisible(true)}
          >
            <Text style={styles.pickerText}>{getDateLabel(selectedDate)}</Text>
            <Feather name="calendar" size={18} color="#7D8491" />
          </TouchableOpacity>
        </View>

        {/* Save Button Component Wrapper */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSaveTransaction}>
          <Text style={styles.saveButtonText}>Save Transaction</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL CATEGORIES POPUP */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderTitle}>Select Category</Text>
            <FlatList
              data={activeCategoryList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.modalItem, category === item && styles.modalItemActive]}
                  onPress={() => {
                    setCategory(item);
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalItemText, category === item && styles.modalItemTextActive]}>{item}</Text>
                  {category === item && <Feather name="check" size={18} color="#007AFF" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 📅 MODAL DATE POPUP */}
      <Modal visible={isDateModalVisible} transparent={true} animationType="fade" onRequestClose={() => setIsDateModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsDateModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderTitle}>Select Date</Text>
            <FlatList
              data={availableDates}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.modalItem, selectedDate === item.value && styles.modalItemActive]}
                  onPress={() => {
                    setSelectedDate(item.value);
                    setIsDateModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalItemText, selectedDate === item.value && styles.modalItemTextActive]}>{item.label}</Text>
                  {selectedDate === item.value && <Feather name="check" size={18} color="#007AFF" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  formBody: {
    padding: 20,
    paddingBottom: 40,
  },
  controlGroup: {
    marginBottom: 25,
    width: '100%',
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E24',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioCard: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    padding: 16,
  },
  incomeActiveCard: { borderColor: '#4CD964', backgroundColor: 'rgba(76, 217, 100, 0.04)' },
  expenseActiveCard: { borderColor: '#FF3B30', backgroundColor: 'rgba(255, 59, 48, 0.04)' },
  outerCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#9CA3AF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  incomeOuterCircle: { borderColor: '#4CD964' },
  expenseOuterCircle: { borderColor: '#FF3B30' },
  innerCircle: { width: 10, height: 10, borderRadius: 5 },
  radioText: { fontSize: 15, fontWeight: '600', color: '#7D8491' },
  activeRadioText: { color: '#1E1E24' },
  
  pickerSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  pickerText: {
    fontSize: 16,
    color: '#1E1E24',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E24',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F3F5',
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  modalItemActive: { backgroundColor: '#F8F9FA' },
  modalItemText: { fontSize: 16, color: '#4B5563' },
  modalItemTextActive: { color: '#007AFF', fontWeight: '600' },

  // Save Transaction Layout Style properties
  saveButton: {
    backgroundColor: '#1E1E24',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1E1E24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});