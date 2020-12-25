import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function AddHabbitScreen({ navigation }) {
  return (
    <View>
      <Text>Add habbits</Text>
      <TouchableHighlight onPress={() => {
        navigation.push('Tips');
      }}
      >
        <Text>Tips</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => {
        navigation.push('Repeat');
      }}
      >
        <Text>Repeat</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => {
        navigation.push('Reminder');
      }}
      >
        <Text>Reminder</Text>
      </TouchableHighlight>
    </View>
  );
}
