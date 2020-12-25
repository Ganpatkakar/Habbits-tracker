import React from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function HabbitsHeader(props) {
  const {
    listsLength = true,
    enableEdit = () => {},
    addList = () => {},
    isActiveEdit = false,
  } = props;
  return (
    <View style={styles.homeHeaderContainer}>
      <View style={styles.editHabbits}>
        {listsLength ? <Text onPress={enableEdit}>{isActiveEdit ? 'Done' : 'Edit'}</Text> : null}
      </View>
      <View style={styles.title}>
        <Text>My Habbits</Text>
      </View>
      <View style={styles.addHabbits}>
        <TouchableHighlight onPress={() => addList()}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableHighlight>
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
