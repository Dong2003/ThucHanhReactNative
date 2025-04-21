import {Button, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const Project2 = () => {
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title='Button' onPress={() => alert("Hello")}></Button>
        </View>
    )
}

export default Project2