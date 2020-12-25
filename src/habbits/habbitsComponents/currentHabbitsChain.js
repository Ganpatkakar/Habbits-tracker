/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const passSevenDaysCalculator = () => {
  const returnDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    returnDates.push(
      new Date(d.setDate(d.getDate() - i)).toISOString().substring(0, 10)
    );
  }
  return returnDates.reverse();
};

export default function CurrentHabbitsChain(props) {
  const { dates } = props;
  const renderWeek = passSevenDaysCalculator().map((day) => {
    return (
      <View style={dates[day] ? styles.activeDayContainer : styles.dayContainer}>
        <Text />
      </View>
    );
  });
  return <View style={styles.weekDays}>{renderWeek}</View>;
}

const styles = StyleSheet.create({
  weekDays: {
    height: 55,
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    borderColor: '#aaa'
  },
  activeDayContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'green',
    borderColor: '#000'
  },
});
