import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { fetchUserContact } from '../utility/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUserContact()
      .then((data) => setUser(data))
      .catch((error) => console.error('Lỗi', error));
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Me</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButtonContainer}>
          <IconButton icon="cog" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Options</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <IconButton icon="close" size={24} color="black" />
            </Pressable>
          </View>

          <TouchableOpacity style={styles.option} onPress={() => console.log('Update Profile')}>
            <Text style={styles.optionText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Change Language')}>
            <Text style={styles.optionText}>Change Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Sign Out')}>
            <Text style={styles.optionText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  iconButtonContainer: {
    marginTop: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  phone: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  fullModalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Profile;