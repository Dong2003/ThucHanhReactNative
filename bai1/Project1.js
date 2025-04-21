import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Project1 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={myStyle.container}>
      <Text style={myStyle.text}>HelloWorld</Text>
    </View>
    </View>
  )
}

export default Project1

const myStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
})
