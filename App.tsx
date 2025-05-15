import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Project1 from './bai1/Project1';
import Project2 from './bai1/Project2';
import Project3 from './bai1/Project3';
import Project4 from './bai1/Project4';
import Project5 from './bai1/Project5';
import Project6 from './bai1/Project6';
import Project7 from './bai1/Project7';
import Project8 from './bai1/Project8';
import Caculator from './bai2/Caculator';
import Lab2Screen from './lab2/Lab2Screen';
import LoginScreen from './lab3/LoginScreen';
import HomeScreenSpa from './lab3/HomeScreenSpa';
import ServiceScreen from './lab3/ServiceScreen';
import ServiceDetailScreen from './lab3/ServiceDetailScreen';
import ServiceUpdateScreen from './lab3/ServiceUpdateScreen';
import HomeScreenUser from './lab3/HomeScreenUser';
import AppointmentScreen from './lab3/AppointmentScreen';
import TransactionScreen from './lab3/TransactionScreen';
import ProfileScreen from './lab3/ProfileScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './bai1/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomeScreenSpa" component={HomeScreenSpa} options={{headerShown: false}} />
        <Stack.Screen name="Service" component={ServiceScreen} options={{title: 'Service', headerShown: false}} />
        <Stack.Screen name="Project1" component={Project1} />
        <Stack.Screen name="Project2" component={Project2} />
        <Stack.Screen name="Project3" component={Project3} />
        <Stack.Screen name="Project4" component={Project4} />
        <Stack.Screen name="Project5" component={Project5} />
        <Stack.Screen name="Project6" component={Project6} />
        <Stack.Screen name="Project7" component={Project7} />
        <Stack.Screen name="Project8" component={Project8} />
        <Stack.Screen name="Caculator" component={Caculator} />
        <Stack.Screen name="Lab2Screen" component={Lab2Screen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{title: 'Service detail', headerShown: false}} />
        <Stack.Screen name="ServiceUpdate" component={ServiceUpdateScreen} options={{title: 'Service', headerShown: false}} />
        <Stack.Screen name="HomeScreenUser" component={HomeScreenUser} options={{headerShown: false}} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{title: 'Appointment', headerShown: false}} />
        <Stack.Screen name="TransactionScreen" component={TransactionScreen} options={{title: 'Transaction', headerShown: false}} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{title: 'Profile', headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
