import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState, useEffect } from 'react/cjs/react.development';
import stylesCommon from '../../utils/custom-text-style';

export default function HabitDetailsScreen({ navigation, route }) {
  const { list, updateHabit, editCompleteHabit } = route.params;
  const { dates: markingDates, id } = list;
  const [markedDates, setMarkedDates] = useState({});
  const [dates, setDates] = useState(markingDates);

  useEffect(() => {
    setMarkedDates(loadMarkedDates());
  }, [dates]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{ ...styles.updateButton, ...stylesCommon.normalText }}
          onPress={updateHabitNavigation}
        >
          Update Habit
        </Text>
      ),
    });
  }, [navigation]);

  const updateHabitNavigation = () => {
    navigation.navigate('EditHabit', { list, editCompleteHabit });
  };

  const loadMarkedDates = () => {
    const newMarkedDates = {};
    const keys = Object.keys(dates);
    for (let i = 0; i < keys.length; i += 1) {
      if (dates[keys[i]]) {
        newMarkedDates[keys[i]] = {
          customStyles: {
            container: {
              backgroundColor: 'green'
            },
            text: {
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        };
      }
    }
    return newMarkedDates;
  };

  const updateMarkedDates = (day) => {
    updateHabit(day.dateString, id);
    dates[day.dateString] = !dates[day.dateString];
    // console.log(dates);
    setDates({ ...dates });
  };

  return (
    <View style={styles.calendarContainer}>
      <CalendarList
        markedDates={markedDates}
        onDayPress={(day) => updateMarkedDates(day)}
        markingType="custom"
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={24}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={1}
        maxDate={new Date()}
        // Enable or disable scrolling of calendar list
        scrollEnabled
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1
  },
  updateButton: {
    marginRight: 5
  }
});
