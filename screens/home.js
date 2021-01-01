import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HabitsScreen from '../src/habits/habitScreen';
import AddHabitScreen from '../src/habits/addHabit/addHabitScreen';
import TipsScreen from '../src/habits/addHabit/tips/tipsScreen';
import RepeatScreen from '../src/habits/addHabit/repeat/repeatScreen';
import ReminderScreen from '../src/habits/addHabit/reminder/reminderScreen';
import HabitDetailsScreen from '../src/habits/details/habitDetailsScreen';
import EditHabit from '../src/habits/details/edit/editHabit';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Habits"
          component={HabitsScreen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: 'Cancel',
            headerTitle: 'New Habit',
          }}
          name="AddHabits"
          component={AddHabitScreen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: 'Back',
            headerTitle: 'Details',
          }}
          name="HabitDetails"
          component={HabitDetailsScreen}
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
        <Stack.Screen
          options={{ headerBackTitle: 'Back', headerTitle: 'Edit Habit' }}
          name="EditHabit"
          component={EditHabit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
