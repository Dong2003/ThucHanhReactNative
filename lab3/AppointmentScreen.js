import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AppointmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params || {};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleAppointment = async () => {
    if (!name || !phone || !date || !time) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      await addDoc(collection(db, 'appointments'), {
        serviceName: service?.name || '',
        name,
        phone,
        date,
        time,
        createdAt: new Date()
      });
      Alert.alert('Thành công', 'Đặt lịch thành công!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HomeScreenUser')
        }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu lịch hẹn. Vui lòng thử lại!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch hẹn</Text>
      <Text style={styles.label}>Dịch vụ:</Text>
      <Text style={styles.serviceName}>{service?.name || 'Không xác định'}</Text>
      <Text style={styles.label}>Tên khách hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Ngày hẹn</Text>
      <TextInput
        style={styles.input}
        placeholder="VD: 01/01/2025"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Giờ hẹn</Text>
      <TextInput
        style={styles.input}
        placeholder="VD: 14:00"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleAppointment}>
        <Text style={styles.buttonText}>Xác nhận đặt lịch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F06277',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#222',
  },
  serviceName: {
    fontSize: 18,
    color: '#F06277',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#F06277',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F06277',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 