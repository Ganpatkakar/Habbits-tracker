/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Switch, Button, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import stylesCommon from '../../../utils/custom-text-style';

export default function ReminderScreen({ navigation, route }) {
  const {
    addReminder,
    reminder = { hour: '', minute: '' },
    isReminderEnable = false,
  } = route.params;
  const [isEnabled, setIsEnabled] = useState(isReminderEnable);
  const [showDatePickerAndriod, setShowDatePickerAndriod] = useState(false);
  const reminderDate = new Date();
  if (reminder.hour !== '' && reminder.hour >= 0) {
    reminderDate.setHours(reminder.hour);
    reminderDate.setMinutes(reminder.minute);
  }
  const [date, setDate] = useState(reminderDate);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSetShowDatePickerAndriod = () => setShowDatePickerAndriod(
    (previousState) => !previousState
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const addAndNavigateBack = () => {
    // console.log(date.getHours(), date.getMinutes());
    addReminder(date.getHours(), date.getMinutes());
    navigation.goBack();
  };

  const datePickerAndriod = () => {
    return (
      <View>
        {(isEnabled || showDatePickerAndriod) && (
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
          </View>
        )}
        <View>
          <Text style={styles.andriodShowTime}>
            Reminder Time
            {date.getHours()}
            {':'}
            {date.getMinutes()}
          </Text>
        </View>
        <View style={styles.toggleDatePicker}>
          <Button title="Change Reminder Time" onPress={toggleSetShowDatePickerAndriod} />
        </View>
        <Button title="Add Reminder" onPress={addAndNavigateBack} />
      </View>
    );
  };

  return (
    <View style={styles.reminbderContainer}>
      <View style={styles.toggleContainer}>
        <View style={styles.reminderTitle}>
          <Text style={{ ...styles.title, ...stylesCommon.normalText }}>Reminder</Text>
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
      {isEnabled && Platform.OS === 'ios' && (
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
          <Button title="Add Reminder" onPress={addAndNavigateBack} />
        </View>
      )}
      {isEnabled && Platform.OS === 'android' && datePickerAndriod()}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  reminderButton: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  timePickerContainer: {},
  toggleDatePicker: {
    marginBottom: 10
  },
  andriodShowTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  }
});
