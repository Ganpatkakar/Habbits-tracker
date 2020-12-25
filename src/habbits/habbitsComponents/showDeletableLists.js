import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ShowHabbits(props) {
  const { lists, deleteLists } = props;
  if (lists.length) {
    const currentHabbitsChain = lists.map((list, index) => {
      return (
        <View style={styles.habbitsContainer}>
          <View
            style={styles.deleteIcon}
            onTouchEndCapture={() => deleteLists(index)}
          >
            <FontAwesome5 name="minus-circle" size={24} color="#e91e63" />
            <View style={styles.habbitTitle}>
              <Text>{list.title}</Text>
            </View>
          </View>
        </View>
      );
    });
    return <View style={styles.habbitsContainer}>{currentHabbitsChain}</View>;
  }
  return (
    <View style={styles.habbitsContainer}>
      <Text>Add Habbits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  habbitsContainer: {
    padding: 5,
  },
  deleteIcon: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  habbitTitle: {
    paddingBottom: 5,
    flexDirection: 'row',
  },
});
