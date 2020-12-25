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
  const renderWeek = weekOrder().map((day, index) => {
    const activeStyle = index === 6 ? styles.activeWeekDay : null;
    return (
      <View style={styles.dayContainer}>
        <Text style={{ ...styles.day, ...activeStyle }}>{day}</Text>
      </View>
    );
  });
  return <View style={styles.weekDays}>{renderWeek}</View>;
};

const styles = StyleSheet.create({
  weekDays: {
    marginTop: 5,
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
  },
  activeWeekDay: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'green'
  },
  day: {
    padding: 5,
    textAlign: 'center',
    color: '#aaa'
  },
});

export default ShowWeekDays;
