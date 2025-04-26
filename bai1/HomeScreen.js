import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const projects = [
  { name: 'Project1', label: 'Bài 1' },
  { name: 'Project2', label: 'Bài 2' },
  { name: 'Project3', label: 'Bài 3' },
  { name: 'Project4', label: 'Bài 4' },
  { name: 'Project5', label: 'Bài 5' },
  { name: 'Project6', label: 'Bài 6' },
  { name: 'Project7', label: 'Bài 7' },
  { name: 'Project8', label: 'Bài 8' },
  { name: 'Caculator', label: 'Phần 2 lab1 caculator' },
  { name: 'Lab2Screen', label: 'Lab2' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Danh sách bài</Text>
      {projects.map((project, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(project.name)}
        >
          <Text style={styles.buttonText}>{project.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4dc2c2',
    padding: 15,
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
