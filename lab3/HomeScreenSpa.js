import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreenSpa() {
  const [services, setServices] = useState([]);
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
      Alert.alert("Lỗi", "Load danh sách dịch vụ thất bại");
    }
  };

  const handleAddService = async () => {
    try {
      const newService = {
        name: 'Dịch vụ mới',
        price: '0 đ'
      };
      await addDoc(collection(db, 'services'), newService);
      fetchServices();
    } catch (error) {
      console.error("ỗi danh sách dịch vụ: ", error);
      Alert.alert("Lỗi", "Load danh sách dịch vụ thất bại");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUYỀN TRINH</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="person-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Logo */}
      <Image source={require('../assets/logolab3.png')} style={styles.logo} resizeMode="contain" />
      {/* Danh sách dịch vụ */}
      <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Service')}>
        <Ionicons name="add-circle" size={28} color="#F06277" />
      </TouchableOpacity>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 80}}>
        {services.map((item) => (
          <View key={item.id} style={styles.serviceBox}>
            <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ServiceUpdate', { service: item })} style={{marginLeft: 8}}>
              <Ionicons name="create-outline" size={22} color="#F06277" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <View style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#F06277" />
          <Text style={styles.tabLabelActive}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <MaterialIcons name="payment" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Transaction</Text>
        </View>
        <View style={styles.tabItem}>
          <FontAwesome name="users" size={22} color="#aaa" />
          <Text style={styles.tabLabel}>Customer</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="settings" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Setting</Text>
        </View>
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
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    color: '#222',
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  addButton: {
    position: 'absolute',
    top: 140,
    right: 30,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
  serviceBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
    fontWeight: '500',
  },
  servicePrice: {
    fontSize: 15,
    color: '#F06277',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  tabLabelActive: {
    fontSize: 12,
    color: '#F06277',
    marginTop: 2,
    fontWeight: 'bold',
  },
}); 