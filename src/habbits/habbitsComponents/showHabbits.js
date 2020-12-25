/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ShowWeekDays from './showWeekDays';
import CurrentHabbitsChain from './currentHabbitsChain';

export default function ShowHabbits(props) {
  const { navigation, lists, updateHabbit } = props;
  const navigateToDetails = (dates, index) => {
    navigation.navigate('HabbitDetails', { dates, updateHabbit, index });
  };
  if (lists.length) {
    const currentHabbits = lists.map((list, index) => {
      return (
        <View style={styles.habitList}>
          <View style={styles.habbitTitleContianer}>
            <View style={styles.titleContianer}>
              <Text style={styles.title}>{list.title}</Text>
            </View>
            <View style={styles.detailsArrow}>
              <Entypo onPress={() => navigateToDetails(list.dates, index)} name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <CurrentHabbitsChain dates={list.dates} index={index} updateHabbit={updateHabbit} />
        </View>
      );
    });
    return (
      <View style={styles.habbitsContainer}>
        <ShowWeekDays />
        {currentHabbits || <Text>Add Habbits</Text>}
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
  habitList: {
    marginTop: 15,
  },
  habbitTitleContianer: {
    flexDirection: 'row',
    padding: 5,
    height: 40,
  },
  titleContianer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  },
  detailsArrow: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end'
  }
});
