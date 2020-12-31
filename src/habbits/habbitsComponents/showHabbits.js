/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View, Text, StyleSheet, FlatList
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ShowWeekDays from './showWeekDays';
import CurrentHabbitsChain from './currentHabbitsChain';

export default function ShowHabbits(props) {
  const { navigation, lists, updateHabbit } = props;
  // const [selectedId, setSelectedId] = useState(null);
  const navigateToDetails = (dates) => {
    navigation.navigate('HabbitDetails', { dates });
  };
  if (lists.length) {
    const renderItem = ({ item: list }) => {
      return (
        <View key={list.id} style={styles.habbitList}>
          <View style={styles.habbitTitleContianer}>
            <View style={styles.titleContianer}>
              <Text style={styles.title}>{list.title}</Text>
            </View>
            <View style={styles.detailsArrow}>
              <Entypo
                onPress={() => navigateToDetails(list.dates)}
                name="chevron-right"
                size={24}
                color="black"
              />
            </View>
          </View>
          <CurrentHabbitsChain dates={list.dates} id={list.id} updateHabbit={updateHabbit} />
        </View>
      );
    };
    return (
      <View style={styles.habbitsContainer}>
        <ShowWeekDays />
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* {currentHabbits || <Text>Add Habbits</Text>} */}
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
    padding: 5
  },
  habbitList: {
    marginTop: 15,
  },
  habbitTitleContianer: {
    flexDirection: 'row',
    padding: 5,
  },
  titleContianer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  },
  detailsArrow: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end'
  }
});

// const currentHabbits = lists.map((list, index) => {
//   return (
//     <View style={styles.habbitList}>
//       <View style={styles.habbitTitleContianer}>
//         <View style={styles.titleContianer}>
//           <Text style={styles.title}>{list.title}</Text>
//         </View>
//         <View style={styles.detailsArrow}>
//           <Entypo
//             onPress={() => navigateToDetails(list.dates, index)}
//             name="chevron-right"
//             size={24}
//             color="black"
//           />
//         </View>
//       </View>
//       <CurrentHabbitsChain dates={list.dates} id={list.id} updateHabbit={updateHabbit} />
//     </View>
//   );
// });
