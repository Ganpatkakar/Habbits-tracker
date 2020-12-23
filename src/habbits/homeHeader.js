import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function HomeHeader() {
  return (
    <View style={styles.homeHeaderContainer}>
      <View style={styles.editHabbits}>
        <Text>Edit</Text>
      </View>
      <View style={styles.title}>
        <Text>My Habbits</Text>
      </View>
      <View style={styles.addHabbits}>
        <AntDesign name="plus" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  homeHeaderContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f00',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  editHabbits: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 2,
    alignItems: 'center',
  },
  addHabbits: {
    flex: 1,
    alignItems: 'center',
  },
});
