import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

const Project4 = () => {
    const [pressCount, setPressCount] = useState(0)
  return (
    <View style={{ marginTop:20, alignItems: 'center' }}>
      <Text>You've pressed the button: {pressCount} time(s)</Text>
      <Button 
        title={`Pressed ${pressCount} tiem(s)`}
        onPress={() => setPressCount(pressCount + 1)}
      />
    </View>
  );
}

export default Project4