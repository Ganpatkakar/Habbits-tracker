/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View, Text, StyleSheet, FlatList
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ShowWeekDays from './showWeekDays';
import CurrentHabitsChain from './currentHabitsChain';
import stylesCommon from '../../utils/custom-text-style';

export default function ShowHabits(props) {
  const {
    navigation,
    lists,
    updateHabit,
    editCompleteHabit
  } = props;
  // const [selectedId, setSelectedId] = useState(null);
  const navigateToDetails = (list) => {
    navigation.navigate('HabitDetails', { list, updateHabit, editCompleteHabit });
  };
  if (lists.length) {
    const renderItem = ({ item: list }) => {
      return (
        <View key={list.id} style={styles.habitList}>
          <View style={styles.habitTitleContianer}>
            <View style={styles.titleContianer}>
              <Text style={{ ...styles.title, ...stylesCommon.normalText }}>{list.title}</Text>
            </View>
            <View style={styles.detailsArrow}>
              <Entypo
                onPress={() => navigateToDetails(list)}
                name="chevron-right"
                size={24}
                color="black"
              />
            </View>
          </View>
          <CurrentHabitsChain dates={list.dates} id={list.id} updateHabit={updateHabit} />
        </View>
      );
    };
    return (
      <View style={styles.habitsContainer}>
        <ShowWeekDays />
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
  return (
    <View style={styles.habitsContainer}>
      <Text style={stylesCommon.normalText}>Add Habits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  habitsContainer: {
    padding: 5
  },
  habitList: {
    marginTop: 15,
  },
  habitTitleContianer: {
    flexDirection: 'row',
    padding: 5,
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
