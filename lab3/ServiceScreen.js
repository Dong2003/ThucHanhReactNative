import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function ServiceScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Tên dịch vụ không được để trống');
      return;
    }
    try {
      const user = auth.currentUser;
      const now = new Date();
      await addDoc(collection(db, 'services'), {
        name,
        price: price + ' đ',
        creator: user ? user.email : 'Unknown',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Thêm dịch vụ thất bại');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service</Text>
        <View style={{width: 28}} />
      </View>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên dịch vụ"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    backgroundColor: '#F06277',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    color: '#222',
  },
  input: {
    backgroundColor: '#f4f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addButton: {
    backgroundColor: '#F06277',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
}); 