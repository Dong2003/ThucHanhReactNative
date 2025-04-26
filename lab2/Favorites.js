import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import { fetchContacts } from '../utility/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        const favoriteContacts = contacts.filter((contact) => contact.favorite);
        setFavorites(favoriteContacts);
      })
      .catch((error) => console.error('Lỗi', error));
  }, []);

  const renderFavorite = ({ item }) => (
    <View style={styles.avatarContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default Favorites;