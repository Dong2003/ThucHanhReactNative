import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from './Favorites';
import Contacts from './Contacts';
import ContactDetail from './ContactDetail';
import Profile from './Profile';
import React from 'react';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ContactsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{ title: 'Contact Detail' }}
      />
    </Stack.Navigator>
  );
};

const Lab2Screen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Contacts"
        component={ContactsStack}
        options={{
          drawerLabel: 'Contacts',
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerLabel: 'Favorites',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Me',
        }}
      />
    </Drawer.Navigator>
  );
};

export default Lab2Screen;