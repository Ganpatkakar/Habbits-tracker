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
      <View key={day} style={{ ...styles.dayContainer, ...activeStyle }}>
        <Text style={{ ...styles.day }}>{day}</Text>
      </View>
    );
  });
  return <View style={styles.weekDays}>{renderWeek}</View>;
};

const styles = StyleSheet.create({
  weekDays: {
    marginTop: 5,
    flexDirection: 'row',
    height: 40,
  },
  dayContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
  },
  activeWeekDay: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    borderColor: 'green',
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  day: {
    textAlign: 'center',
    color: '#aaa',
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
  },
});

export default ShowWeekDays;
