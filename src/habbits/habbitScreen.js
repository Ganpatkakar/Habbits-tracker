import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HabbitsHeader from './habbitsComponents/habbitsHeader';
import ShowHabbits from './habbitsComponents/showHabbits';
import ShowDeletableLists from './habbitsComponents/showDeletableLists';

export default function HabbitsScreen(props) {
  const { navigation } = props;
  const [lists, setList] = useState([{
    title: 'Meditation',
    dates: { '2020-12-25': true, '2020-12-24': true, '2020-12-20': true },
  },
  {
    title: 'm2',
    dates: { '2020-12-21': true, '2020-12-22': true, '2020-12-19': true },
  }]);
  const [isActiveEdit, setActiveEdit] = useState(false);

  useEffect(() => {
    if (!lists.length) {
      setActiveEdit(false);
    }
  }, [lists]);

  const updateHabbit = (day, index) => {
    lists[index].dates[day] = lists[index].dates[day] ? !lists[index].dates[day] : true;
    setList([...lists]);
  };

  const enableEdit = () => {
    setActiveEdit(!isActiveEdit);
  };
  const addList = () => {
    navigation.navigate('AddHabbits');
  };
  const deleteLists = (index) => {
    const newList = lists.filter((l, i) => i !== index);
    setList(newList);
  };
  const showLists = isActiveEdit ? (
    <ShowDeletableLists lists={lists} deleteLists={deleteLists} />
  ) : (
    <ShowHabbits navigation={navigation} lists={lists} updateHabbit={updateHabbit} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HabbitsHeader
        listsLength={lists.length}
        enableEdit={enableEdit}
        addList={addList}
        isActiveEdit={isActiveEdit}
      />
      {showLists}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
