/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Button
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';
import Separator from '../../utils/seperator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const askPermissions = async () => {
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

async function schedulePushNotification(body, time) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'My Habbits',
      body,
      data: { data: 'goes here' },
    },
    trigger: {
      hour: time.hrs,
      minute: time.min,
      // seconds: 60,
      repeats: true,
    },
  });
}

export default function AddHabbitScreen({ navigation, route }) {
  const { addNewHabbit } = route.params;
  const [value, onChangeText] = React.useState('');
  const [reminder, setReminder] = React.useState({ hours: '', minutes: '' });
  const [isReminderEnable, setReminderEnable] = useState(false);

  useEffect(() => {
    askPermissions();
  }, []);

  const addButtonClick = () => {
    const newHabbit = {
      title: value,
      dates: {}
    };
    if (reminder.hours >= 0) {
      newHabbit.reminderTime = {
        hours: reminder.hours,
        minutes: reminder.minutes
      };
    }
    addNewHabbit(newHabbit);
    navigation.goBack();
  };

  const selectTips = (tipVal) => {
    onChangeText(tipVal);
  };

  const addReminder = (hours, minutes) => {
    setReminder({ hours, minutes });
    setReminderEnable(true);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 10, marginTop: 20 }}>
      <View style={styles.newHabbitTitle}>
        <View style={styles.habbitTitleContainer}>
          <TextInput
            style={styles.habbitTitle}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Name"
            autoFocus
            value={value}
          />
        </View>
        <View style={styles.habbitTippsContainer}>
          <TouchableOpacity onPress={() => {
            navigation.push('Tips', { selectTips });
          }}
          >
            <View style={styles.tipsSectionHorizontal}>
              <Text style={styles.tipText}>Tips</Text>
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
          <Text style={styles.tipText}>Reminder</Text>
          <Entypo style={styles.arrowIcon} name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <Separator />

      <Button
        title="Add Habbit"
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
  newHabbitTitle: {
    flexDirection: 'row',
  },
  habbitTitleContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  habbitTitle: {
    height: 40,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderColor: '#aaa',
    color: '#000',
    fontSize: 16
  },
  habbitTippsContainer: {
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
