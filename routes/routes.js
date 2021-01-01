import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

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
            tabBarLabel: () => (
              <Text
                style={styles.bottomNavText}
              >
                Habit Tracker
              </Text>
            ),
            tabBarIcon: ({ color = '#000', size = 36 }) => (
              <FontAwesome style={styles.chainIcon} name="chain" size={size} color={color} />
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

const styles = StyleSheet.create({
  bottomNavText: {
    margin: 5,
    fontSize: 18
  },
  chainIcon: {
    transform: [{ rotate: '-45deg' }],
    height: 30,
    marginTop: 10
  }
});
