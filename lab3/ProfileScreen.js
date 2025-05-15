import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../Firebase/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('LoginScreen');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreenUser')}>
          <Ionicons name="arrow-back" marginTop={40} size={28} color="#F06277" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
        <View style={{width: 36}} />
      </View>
      <View style={styles.content}>
        <View style={styles.avatarBox}>
          <Ionicons name="person-circle" size={100} color="#F06277" />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Không có'}</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
    width: 36,
    alignItems: 'flex-start',
  },
  headerTitle: {
    marginTop:40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F06277',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  avatarBox: {
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    shadowColor: '#F06277',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: '#888',
    marginTop: 8,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  value: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    fontWeight: '500',
    alignSelf: 'center',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
    alignSelf: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#F06277',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#F06277',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
}); 