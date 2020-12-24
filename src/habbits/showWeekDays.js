/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowWeekDays = () => {
  return (
    <View style={styles.weekDays}>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>S</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>M</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>T</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>W</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>T</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>F</Text>
      </View>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>S</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekDays: {
    height: 55,
    flexDirection: 'row',
  },
  dayContainer: {
    margin: 5,
    flex: 1,
    width: 100,
    borderRadius: 100,
    justifyContent: 'space-around',
    backgroundColor: '#e91e63',
  },
  day: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default ShowWeekDays;
