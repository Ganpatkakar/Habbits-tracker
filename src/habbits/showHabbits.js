import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShowHabbits({ lists, updateList }) {
  if (lists.length) {
    const currentHabbitsChain = lists.map((element) => {
      return (
        <View key={element.title}>
          <Text styles={styles.habbitTitle}>{element.title}</Text>
          {element.habbitsChain.map((chain, index) => {
            return (
              <Text key={chain} onPress={() => updateList(index)}>
                {chain}
              </Text>
            );
          })}
        </View>
      );
    });
    return (
      <View style={styles.habbitsContainer}>
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

ShowHabbits.defaultProps = {
  lists: [{ title: '', habbitsChain: [] }],
  updateList: () => {},
};

const styles = StyleSheet.create({
  habbitsContainer: {
    flex: 1,
  },
  habbitTitle: {
    paddingBottom: 5,
    paddingTop: 15,
  },
});
