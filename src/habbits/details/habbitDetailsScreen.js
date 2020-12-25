import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

export default function HabbitDetailsScreen() {
  return (
    <View style={styles.calendarContainer}>
      <CalendarList
        onVisibleMonthsChange={(months) => {
          console.log('now these months are visible', months);
        }}
        onDayPress={(day) => { console.log('selected day', day) }}
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
