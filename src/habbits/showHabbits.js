/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowWeekDays from './showWeekDays';

export default function ShowHabbits(props) {
  const { lists, updateList } = props;
  if (lists.length) {
    // const currentHabbitsChain = lists.map((element) => {
    //   return (
    //     <View key={element.title}>
    //       <Text styles={styles.habbitTitle}>{element.title}</Text>
    //       {element.habbitsChain.map((chain, index) => {
    //         return (
    //           <Text key={chain} onPress={() => updateList(index)}>
    //             {chain}
    //           </Text>
    //         );
    //       })}
    //     </View>
    //   );
    // });
    const currentHabbitsChain = lists.map((list) => {
      return (
        <View>
          <Text onPress={updateList} style={styles.habbitTitle}>
            {list}
          </Text>
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
