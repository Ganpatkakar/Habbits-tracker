/* eslint-disable radix */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Button
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';
import Separator from '../../utils/seperator';
import stylesCommon from '../../utils/custom-text-style';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
};

export async function schedulePushNotification(body, time) {
  const currentScheduleNotificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'My Habit',
      body: `Time for ${body}`,
      data: { data: 'goes here' },
    },
    trigger: {
      hour: parseInt(time.hour),
      minute: parseInt(time.minute),
      // seconds: 60,
      repeats: true,
    },
  });
  return Promise.resolve(currentScheduleNotificationId);
}

export default function AddHabitScreen({ navigation, route }) {
  const { addNewHabit } = route.params;
  const [value, onChangeText] = React.useState('');
  const [reminder, setReminder] = React.useState({ hour: '', minute: '' });
  const [isReminderEnable, setReminderEnable] = useState(false);

  useEffect(() => {
    askPermissions();
  }, []);

  const addButtonClick = () => {
    // console.log(reminder);
    const newHabit = {
      title: value,
      dates: {}
    };
    if (reminder.hour !== '' && reminder.hour >= 0) {
      newHabit.reminderTime = {
        hour: reminder.hour,
        minute: reminder.minute
      };
      schedulePushNotification(newHabit.title, newHabit.reminderTime)
        .then((scheduleNotificationId) => {
          newHabit.scheduleNotificationId = scheduleNotificationId;
          addNewHabit(newHabit);
          navigation.goBack();
        })
        .catch((err) => {
          console.log('Error while getting schedule notification id', err);
        });
    } else {
      addNewHabit(newHabit);
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

      {/* <TouchableHighlight onPress={() => {
        navigation.push('Repeat');
      }}
      >
        <Text>Repeat</Text>
      </TouchableHighlight> */}
      <Separator />

      <TouchableOpacity onPress={() => navigation.push('Reminder', { reminder, addReminder, isReminderEnable })}>
        <View style={styles.tipsSectionHorizontal}>
          <Text style={{ ...styles.tipText, ...stylesCommon.normalText }}>Reminder</Text>
          <Entypo style={styles.arrowIcon} name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <Separator />

      <Button
        title="Add Habit"
        disabled={!value.length}
        onPress={addButtonClick}
      />

      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
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
