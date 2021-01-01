import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import stylesCommon from '../src/utils/custom-text-style';

// import Settings from '../screens/settings';
import Home from '../screens/home';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: () => (<Text style={stylesCommon.normalText}>Habits</Text>),
            tabBarIcon: ({ color = '#000', size = 24 }) => (
              <Ionicons name="md-infinite" size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color = '#000', size = 24 }) => (
              <Feather name="more-horizontal" size={size} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
