/* eslint-disable radix */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Button
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Entypo } from '@expo/vector-icons';
import Separator from '../../../utils/seperator';
import stylesCommon from '../../../utils/custom-text-style';
import { schedulePushNotification, askPermissions } from '../../addHabit/addHabitScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function EditHabit({ navigation, route }) {
  const { list, editCompleteHabit } = route.params;
  const {
    id = '',
    title = '',
    reminderTime: pastReminder = { hour: '', minute: '' },
    scheduleNotificationId: previousNotificationId = '',
    dates = {}
  } = list;
  const [value, onChangeText] = React.useState(title);
  const [reminder, setReminder] = React.useState({ ...pastReminder });
  const isPastReminderEnabled = pastReminder.hour !== '' && pastReminder.hour >= 0;
  const [isReminderEnable, setReminderEnable] = useState(isPastReminderEnabled);

  useEffect(() => {
    askPermissions();
  }, []);

  const addButtonClick = () => {
    const editedHabit = {
      id,
      title: value,
      reminderTime: pastReminder,
      scheduleNotificationId: previousNotificationId,
      dates
    };
    if (reminder.hour !== '' && reminder.hour >= 0) {
      if (previousNotificationId) {
        Notifications.cancelScheduledNotificationAsync(previousNotificationId);
      }
      editedHabit.reminderTime = {
        hour: reminder.hour,
        minute: reminder.minute
      };
      schedulePushNotification(editedHabit.title, editedHabit.reminderTime)
        .then((scheduleNotificationId) => {
          editedHabit.scheduleNotificationId = scheduleNotificationId;
          editCompleteHabit(editedHabit);
          navigation.goBack();
        })
        .catch((err) => {
          console.log('Error while getting schedule notification id', err);
        });
    } else {
      editCompleteHabit(editedHabit);
      navigation.goBack();
    }
  };

  const selectTips = (tipVal) => {
    onChangeText(tipVal);
  };

  const addReminder = (hour, minute) => {
    setReminder({ hour, minute });
    setReminderEnable(true);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 10, marginTop: 20 }}>
      <View style={styles.newHabitTitle}>
        <View style={styles.habitTitleContainer}>
          <TextInput
            style={styles.habitTitle}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Name"
            autoFocus
            value={value}
          />
        </View>
        <View style={styles.habitTippsContainer}>
          <TouchableOpacity onPress={() => {
            navigation.push('Tips', { selectTips });
          }}
          >
            <View style={styles.tipsSectionHorizontal}>
              <Text style={{ ...styles.tipText, ...stylesCommon.normalText }}>Tips</Text>
              <Entypo style={styles.arrowIcon} name="chevron-right" size={24} color="black" />
            </View>

          </TouchableOpacity>
        </View>
      </View>
      <Separator />

      <TouchableOpacity
        onPress={() => navigation.push('Reminder', { reminder, addReminder, isReminderEnable })}
      >
        <View style={styles.tipsSectionHorizontal}>
          <Text style={{ ...styles.tipText, ...stylesCommon.normalText }}>Reminder</Text>
          <Entypo style={styles.arrowIcon} name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <Separator />

      <Button
        title="Update Habit"
        disabled={!value.length}
        onPress={addButtonClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newHabitTitle: {
    flexDirection: 'row',
  },
  habitTitleContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  habitTitle: {
    height: 40,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderColor: '#aaa',
    color: '#000',
    fontSize: 16
  },
  habitTippsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#aaa',
  },
  tipsSectionHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
