/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const weekOrder = () => {
  const d = new Date();
  const weekDay = d.getDay();
  let i = weekDay + 1 > 6 ? 0 : weekDay + 1;
  const renderWeek = [];
  while (i !== weekDay) {
    renderWeek.push(weekDays[i]);
    i = i + 1 > 6 ? 0 : i + 1;
  }
  renderWeek.push(weekDays[weekDay]);
  return renderWeek;
};

const ShowWeekDays = () => {
  const renderWeek = weekOrder().map((day) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.day}>{day}</Text>
      </View>
    );
  });
  return <View style={styles.weekDays}>{renderWeek}</View>;
};

const styles = StyleSheet.create({
  weekDays: {
    height: 55,
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  day: {
    textAlign: 'center',
    color: '#bbb',
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default ShowWeekDays;
