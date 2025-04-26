import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

const ContactDetail = ({ route }) => {
  const { name, avatar, phone, email } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <IconButton icon="email" size={24} color="#333" />
          <Text style={styles.detailText}>{email}</Text>
        </View>
        <View style={styles.detailRow}>
          <IconButton icon="briefcase" size={24} color="#333" />
          <Text style={styles.detailText}>{phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <IconButton icon="cellphone" size={24} color="#333" />
          <Text style={styles.detailText}>{phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  phone: {
    fontSize: 18,
    color: 'white',
  },
  detailsContainer: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default ContactDetail;