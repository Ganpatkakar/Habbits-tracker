import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ShowHabbits(props) {
  const { lists, deleteLists } = props;
  if (lists.length) {
    const renderItem = ({ item: list }) => {
      return (
        <View style={styles.habbitsContainer}>
          <TouchableOpacity>
            <View style={styles.tipsSectionHorizontal}>
              <FontAwesome5 onTouchEndCapture={() => deleteLists(list.id)} style={styles.minusIcon} name="minus-circle" size={24} color="#e91e63" />
              <Text>{list.title}</Text>
            </View>

          </TouchableOpacity>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.habbitsContainer}>
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
    padding: 5,
  },
  tipsSectionHorizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  minusIcon: {
    marginRight: 10
  }
});
