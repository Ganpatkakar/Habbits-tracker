/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowWeekDays from './showWeekDays';
import CurrentHabbitsChain from './currentHabbitsChain';

export default function ShowHabbits(props) {
  const { navigation, lists } = props;
  const navigateToDetails = () => {
    navigation.navigate('HabbitDetails');
  };
  if (lists.length) {
    const currentHabbitsChain = lists.map((list) => {
      return (
        <View>
          <Text onPress={navigateToDetails} style={styles.habbitTitle}>
            {list.title}
          </Text>
          <CurrentHabbitsChain dates={list.dates} />
        </View>
      );
    });
    return (
      <View style={styles.habbitsContainer}>
        <ShowWeekDays />
        {currentHabbitsChain || <Text>Add Habbits</Text>}
      </View>
    );
  }
  return (
    <View style={styles.habbitsContainer}>
      <Text>Add Habbits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  habbitsContainer: {
    padding: 10,
  },
  habbitTitle: {
    paddingBottom: 5,
    paddingTop: 15,
  }
});
