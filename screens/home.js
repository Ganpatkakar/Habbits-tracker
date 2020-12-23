import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet
} from 'react-native';
import HomeHeader from '../src/habbits/homeHeader';
import ShowHabbits from '../src/habbits/showHabbits';

export default function Home() {
  const [lists, setList] = useState([]);
  useEffect(() => {
    getLists();
  });
  const getLists = () => {
    const dummyLists = [
      { title: 'meditation', habbitsChain: ['true', 'true', false] }
    ];
    setList(dummyLists);
  };
  const editList = () => {

  };
  const addList = () => {

  };
  const updateList = () => {

  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader editList={editList} addList={addList} />
      <ShowHabbits lists={lists} updateList={updateList} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
