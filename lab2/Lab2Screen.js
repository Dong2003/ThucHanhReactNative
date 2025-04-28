import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from './Favorites';
import Contacts from './Contacts';
import ContactDetail from './ContactDetail';
import Profile from './Profile';
import React from 'react';
import { Icon } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
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

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Contacts') {
            iconName = 'account-box';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return (
            <Icon
              source={iconName}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Contacts" component={ContactsStack} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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
        name="Home"
        component={BottomTabs}
        options={{
          drawerLabel: 'Home',
        }}
      />
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