/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Switch, Button
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReminderScreen({ navigation, route }) {
  const { addReminder, reminder = { hours: '', minutes: '' }, isReminderEnable = false } = route.params;
  const [isEnabled, setIsEnabled] = useState(isReminderEnable);
  const reminderDate = new Date();
  if (reminder.hours >= 0) {
    reminderDate.setHours(reminder.hours);
    reminderDate.setMinutes(reminder.minutes);
  }
  const [date, setDate] = useState(reminderDate);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const addAndNavigateBack = () => {
    // console.log(date.getHours(), date.getMinutes());
    addReminder(date.getHours(), date.getMinutes());
    navigation.goBack();
  };

  return (
    <View style={styles.reminbderContainer}>
      <View style={styles.toggleContainer}>
        <View style={styles.reminderTitle}>
          <Text style={styles.title}>Reminder</Text>
        </View>
        <View style={styles.reminderButton}>
          <Switch
            trackColor={{ false: '#767577', true: 'green' }}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      {
        isEnabled && (
        <View style={styles.timePickerContainer}>
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour
              display="default"
              onChange={onChange}
            />
          </View>
          <Button
            title="Add Reminder"
            onPress={addAndNavigateBack}
          />
        </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  reminbderContainer: {
    padding: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  reminderTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  },
  reminderButton: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end'
  },
  timePickerContainer: {}
});
