import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(list);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách đặt lịch!');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (item) => {
    setAccepting(item.id);
    try {
      await updateDoc(doc(db, 'appointments', item.id), { accepted: true });
      setAppointments(prev => prev.map(appt => appt.id === item.id ? { ...appt, accepted: true } : appt));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái!');
    } finally {
      setAccepting('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.serviceName}>{item.serviceName || 'Dịch vụ'}</Text>
      <Text style={styles.info}>Khách: <Text style={styles.bold}>{item.name}</Text></Text>
      <Text style={styles.info}>SĐT: <Text style={styles.bold}>{item.phone}</Text></Text>
      <Text style={styles.info}>Ngày: <Text style={styles.bold}>{item.date}</Text>  |  Giờ: <Text style={styles.bold}>{item.time}</Text></Text>
      <TouchableOpacity
        style={[styles.acceptButton, item.accepted && styles.acceptedButton]}
        onPress={() => handleAccept(item)}
        disabled={item.accepted || accepting === item.id}
      >
        <Text style={[styles.acceptButtonText, item.accepted && styles.acceptedButtonText]}>
          {item.accepted ? 'Đã nhận' : (accepting === item.id ? 'Đang nhận...' : 'Accept')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#F06277" />
        </TouchableOpacity>
        <Text style={styles.title}>Quản lý đặt lịch</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#F06277" style={{marginTop: 40}} />
      ) : appointments.length === 0 ? (
        <Text style={{marginTop: 40, color: '#aaa'}}>Chưa có lịch hẹn nào.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 40}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F06277',
    letterSpacing: 1,
  },
  itemBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F06277',
    padding: 18,
    marginBottom: 16,
    shadowColor: '#F06277',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  serviceName: {
    fontSize: 17,
    color: '#F06277',
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  info: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
  acceptButton: {
    marginTop: 12,
    backgroundColor: '#F06277',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    minWidth: 90,
    paddingHorizontal: 18,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  acceptedButton: {
    backgroundColor: '#aaa',
  },
  acceptedButtonText: {
    color: '#fff',
  },
}); 