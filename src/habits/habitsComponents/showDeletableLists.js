import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import stylesCommon from '../../utils/custom-text-style';

export default function ShowHabits(props) {
  const { lists, deleteLists } = props;
  if (lists.length) {
    const renderItem = ({ item: list }) => {
      return (
        <View style={styles.habitsContainer}>
          <TouchableOpacity>
            <View style={styles.tipsSectionHorizontal}>
              <FontAwesome5 onTouchEndCapture={() => deleteLists(list.id)} style={styles.minusIcon} name="minus-circle" size={24} color="#e91e63" />
              <Text style={stylesCommon.normalText}>{list.title}</Text>
            </View>

          </TouchableOpacity>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.habitsContainer}>
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
