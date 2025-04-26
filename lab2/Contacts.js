import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts } from '../utility/api';
import ContactListItem from './ContactListItem';

const keyExtractor = ({ id }) => id;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchContacts()
      .then((contacts) => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  }, []);

  const renderContact = ({ item }) => {
    const { name, avatar, phone, email } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        email={email}
        onPress={() => {
          navigation.navigate('ContactDetail', { name, avatar, phone, email });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
});

export default Contacts;