import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesCommon from '../../utils/custom-text-style';

export default function HabitsHeader(props) {
  const {
    listsLength = true,
    enableEdit = () => {},
    addList = () => {},
    isActiveEdit = false,
  } = props;
  return (
    <View style={styles.homeHeaderContainer}>
      <View style={styles.editHabits}>
        {listsLength ? <Text style={stylesCommon.normalText} onPress={enableEdit}>{isActiveEdit ? 'Done' : 'Edit'}</Text> : null}
      </View>
      <View style={styles.title}>
        <Text style={stylesCommon.textTitle}>My Habits</Text>
      </View>
      <View style={styles.addHabits}>
        <TouchableOpacity onPress={() => addList()}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
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
  editHabits: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 2,
    alignItems: 'center',
  },
  addHabits: {
    flex: 1,
    alignItems: 'center',
  }
});
