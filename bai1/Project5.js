import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Square = ({text, bgColor = "#7ce0f9"}) => (
    <View style={[styles.box, {backgroundColor: bgColor}]}>
        <Text>{text}</Text>
    </View>
);

const Project5 = () => {
  return (
    <View style={styles.container}>
      <Square text="Square 1" />
      <Square text="Square 2" bgColor='red'/>
      <Square text="Square 3" bgColor='yellow'/>
    </View>
  );
};

export default Project5

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});