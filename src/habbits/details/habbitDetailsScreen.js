import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState, useEffect } from 'react/cjs/react.development';

export default function HabbitDetailsScreen({ route }) {
  const { dates } = route.params;
  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    setMarkedDates(loadMarkedDates());
  }, [dates]);

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
    return { ...newMarkedDates };
  };
  return (
    <View style={styles.calendarContainer}>
      <CalendarList
        markedDates={markedDates}
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
  }
});
