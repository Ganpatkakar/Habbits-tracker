import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList
} from 'react-native';
import Separator from '../../../utils/seperator';

const tipsList = [
  'Exercise', 'Eat More Vegetable', 'Limit Caffeine', 'Practice Yoga', 'Wake up early',
  'Meditate', 'Journeling', 'Read', 'Study', 'Write code'
];

export default function TipsScreen({ navigation, route }) {
  const { selectTips } = route.params;
  const navigateBack = (val) => {
    selectTips(val);
    navigation.goBack();
  };
  const renderItem = ({ item }) => {
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => navigateBack(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
        <Separator />
      </View>
    );
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 10 }}>
      <Separator />
      <FlatList
        data={tipsList}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />

    </View>
  );
}
