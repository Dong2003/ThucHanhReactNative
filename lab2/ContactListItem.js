import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import React from 'react';
import color from '../utility/color';
import PropTypes from 'prop-types';

const ContactListItem = ({ name, email, avatar, phone, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor={color.gray}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  details: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
  },
});

export default ContactListItem;