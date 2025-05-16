import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function CustomerScreen() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(list);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách tài khoản!');
    }
  };

  const handleAddCustomer = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên và số điện thoại!');
      return;
    }
    try {
      await addDoc(collection(db, 'customers'), { name, phone });
      setName('');
      setPhone('');
      fetchUsers();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm khách hàng!');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      fetchUsers();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa tài khoản!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý khách hàng</Text>
        <View style={{width: 28}} />
      </View>
      {/* Form thêm khách hàng */}
      {/* Đã bỏ form thêm khách hàng vì user chỉ được tạo qua đăng ký */}
      {/* Danh sách khách hàng */}
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 40}}>
        {customers.map((item) => (
          <View key={item.id} style={styles.customerBox}>
            <Text style={styles.customerName}>{item.email}</Text>
            <Text style={styles.customerPhone}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash" size={22} color="#F06277" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#F06277',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
  form: {
    width: '90%',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  addButton: {
    backgroundColor: '#F06277',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customerName: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  customerPhone: {
    fontSize: 15,
    color: '#F06277',
    fontWeight: 'bold',
    marginTop: 4,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
}); 