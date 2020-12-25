/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const passSevenDaysCalculator = () => {
  const returnDates = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    returnDates.push(
      new Date(d.setDate(d.getDate() - i)).toISOString().substring(0, 10)
    );
  }
  return returnDates.reverse();
};

export default function CurrentHabbitsChain(props) {
  const { dates, updateHabbit, index } = props;
  const renderWeeksHabbits = passSevenDaysCalculator().map((day) => {
    return (
      <View
        onTouchEndCapture={() => updateHabbit(day, index)}
        style={dates[day] ? styles.activeDayContainer : styles.dayContainer}
      >
        <Text />
      </View>
    );
  });
  return <View style={styles.weekDays}>{renderWeeksHabbits}</View>;
}

const styles = StyleSheet.create({
  weekDays: {
    height: 40,
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    borderWidth: 0.25,
    borderColor: '#aaa',
  },
  activeDayContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    justifyContent: 'space-around',
    backgroundColor: 'green',
    borderWidth: 0.25,
    borderColor: '#aaa',
  },
});
