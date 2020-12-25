import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HabbitsScreen from '../src/habbits/habbitScreen';
import AddHabbitScreen from '../src/habbits/addHabbit/addHabbitScreen';
import TipsScreen from '../src/habbits/addHabbit/tips/tipsScreen';
import RepeatScreen from '../src/habbits/addHabbit/repeat/repeatScreen';
import ReminderScreen from '../src/habbits/addHabbit/reminder/reminderScreen';
import HabbitDetailsScreen from '../src/habbits/details/habbitDetailsScreen';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Habbits"
          component={HabbitsScreen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: 'Cancel',
            headerTitle: 'New Habbit',
          }}
          name="AddHabbits"
          component={AddHabbitScreen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: 'Back',
            headerTitle: 'Details',
          }}
          name="HabbitDetails"
          component={HabbitDetailsScreen}
        />
        <Stack.Screen
          options={{ headerBackTitle: 'Back', headerTitle: 'Tips' }}
          name="Tips"
          component={TipsScreen}
        />
        <Stack.Screen
          options={{ headerBackTitle: 'Back', headerTitle: 'Repeat' }}
          name="Repeat"
          component={RepeatScreen}
        />
        <Stack.Screen
          options={{ headerBackTitle: 'Back', headerTitle: 'Reminder' }}
          name="Reminder"
          component={ReminderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
