import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      backgroundColor: 'red',
      alignSelf: 'center',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      ...props.buttonStyle,
    }}
  >
    <Text style={{ color: '#fff', fontSize: 16 }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const Project3 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomButton
        text="Say Hello"
        onPress={() => alert('Say Hello !!!')}
      />
      <CustomButton
        text="Say Goodbye"
        onPress={() => alert('Goodbye')}
        buttonStyle={{ backgroundColor: '#4dc2c2' }}
      />
    </View>
  );
};

export default Project3;
