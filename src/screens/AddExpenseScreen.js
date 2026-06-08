import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import CustomInput from '../components/CustomInput';
export default function AddExpenseScreen({navigation}) {
  const [title,setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('Expense');
  const expenseCategories = ['Food', 'Transport', 'Bills', 'Rent', 'Shopping', 'Entertainment'];
  const incomeCategories = ['Salary', 'Bonus', 'Freelance', 'Gift'];

  // 2. Category State Tracking (Defaults to first Expense)
  const [category, setCategory] = useState('Food');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(()=>{
    if(transactionType === 'Expense'){
      setCategory('Food')
    }
    else{
      setCategory('Salary')
    }

  },[transactionType])
  const handleBackAction = () => {
    console.log('Pop back to HomeScreen');
    // Navigation wireframe will replace this log shortly!
  };

 const activeCategoryList = transactionType === 'Expense' ? expenseCategories : incomeCategories;

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

        {/* 3. Section 5: Category Picker Component Dropdown */}
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

      </ScrollView>

      {/* MODAL POPUP SELECTOR INTERFACE */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsModalVisible(false)}
        >
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
                  <Text style={[styles.modalItemText, category === item && styles.modalItemTextActive]}>
                    {item}
                  </Text>
                  {category === item && <Feather name="check" size={18} color="#007AFF" />}
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
  },
  formBody: {
    padding: 20,
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
  
  // Picker Selector Styles
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

  // Modal Layout Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dim behind the overlay window
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
  modalItemActive: {
    backgroundColor: '#F8F9FA',
  },
  modalItemText: {
    fontSize: 16,
    color: '#4B5563',
  },
  modalItemTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});