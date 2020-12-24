import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeHeader from '../src/habbits/homeHeader';
import ShowHabbits from '../src/habbits/showHabbits';
import ShowDeletableLists from '../src/habbits/showDeletableLists';

export default function Home() {
  const [lists, setList] = useState(['m1', 'm2']);
  const [isActiveEdit, setActiveEdit] = useState(false);
  useEffect(() => {
    if (!lists.length) {
      setActiveEdit(false);
    }
  }, [lists]);
  const enableEdit = () => {
    setActiveEdit(!isActiveEdit);
  };
  const addList = () => {};
  const deleteLists = (index) => {
    const newList = lists.filter((l, i) => i !== index);
    setList(newList);
  };
  const updateList = () => {};
  const showLists = isActiveEdit ? (
    <ShowDeletableLists lists={lists} deleteLists={deleteLists} />
  ) : (
    <ShowHabbits lists={lists} updateList={updateList} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
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
