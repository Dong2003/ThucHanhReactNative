import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreenUser() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesList);
    } catch (error) {
      console.error("Lỗi danh sách dịch vụ: ", error);
      Alert.alert("Lỗi", "Không thể tải danh sách dịch vụ");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('LoginScreen');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  const showLogoutOptions = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Đăng xuất',
          onPress: handleLogout,
          style: 'destructive'
        }
      ]
    );
  };

  const filteredServices = services.filter(service =>
    service.name && service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUYỀN TRINH</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={showLogoutOptions}>
          <Ionicons name="log-out-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image source={require('../assets/logolab3.png')} style={styles.logo} resizeMode="contain" />

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm dịch vụ theo tên..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>
      
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 20}}>
        {filteredServices.map((item) => (
          <View key={item.id} style={styles.serviceBox}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>{item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.appointmentButton}
                onPress={() => navigation.navigate('AppointmentScreen', { service: item })}
              >
                <Text style={styles.appointmentButtonText}>Đặt lịch</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('HomeScreenUser')} activeOpacity={0.7}>
          <Ionicons name="home" size={26} color="#F06277" />
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ProfileScreen')} activeOpacity={0.7}>
          <Ionicons name="person-circle" size={26} color="#aaa" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  headerIcon: {
    marginLeft: 8,
  },
  logo: {
    width: 180,
    height: 70,
    marginVertical: 10,
  },
  searchInput: {
    width: '90%',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    color: '#222',
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  serviceBox: {
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
  },
  serviceName: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  servicePrice: {
    fontSize: 15,
    color: '#F06277',
    fontWeight: 'bold',
    marginTop: 4,
  },
  appointmentButton: {
    backgroundColor: '#F06277',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    alignSelf: 'flex-end',
    minWidth: 70,
  },
  appointmentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabLabel: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontSize: 13,
    color: '#F06277',
    marginTop: 2,
    fontWeight: 'bold',
  },
}); 