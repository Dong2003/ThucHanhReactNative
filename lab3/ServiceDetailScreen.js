import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../Firebase/FirebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const pad = (n) => n < 10 ? '0' + n : n;
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function ServiceDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;

  const handleDelete = () => {
    Alert.alert('Warning', 'Bạn có muốn xóa không?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await deleteDoc(doc(db, 'services', service.id));
          navigation.goBack();
        } catch (e) {
          Alert.alert('Error', 'Failed to delete service');
        }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service detail</Text>
        <Ionicons name="ellipsis-vertical" size={24} color="#fff" onPress={handleDelete} />
      </View>
      {/* Detail */}
      <View style={styles.detailBox}>
        <Text><Text style={styles.bold}>Service name:</Text> {service.name}</Text>
        <Text><Text style={styles.bold}>Price:</Text> {service.price}</Text>
        <Text><Text style={styles.bold}>Creator:</Text> {service.creator}</Text>
        <Text><Text style={styles.bold}>Time:</Text> {service.createdAt ? formatDate(service.createdAt) : '00/00/2025 23:59:59'}</Text>
        <Text><Text style={styles.bold}>Final update:</Text> {service.updatedAt ? formatDate(service.updatedAt) : '00/00/2025 23:59:59'}</Text>
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
    paddingBottom: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  detailBox: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
}); 