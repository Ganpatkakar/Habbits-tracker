/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import HabitsHeader from './habitsComponents/habitsHeader';
import ShowHabits from './habitsComponents/showHabits';
import ShowDeletableLists from './habitsComponents/showDeletableLists';

export default function HabitsScreen(props) {
  const { navigation } = props;
  const [lists, setList] = useState([{
    id: uuidv4(),
    title: 'Meditation',
    dates: { '2020-12-25': true, '2020-12-24': true, '2020-12-20': true },
  },
  {
    id: uuidv4(),
    title: 'm2',
    dates: { '2020-12-21': true, '2020-12-22': true, '2020-12-19': true },
  },
  {
    dates: {
      '2020-12-29': true,
      '2020-12-30': true,
      '2020-12-31': true,
    },
    id: '66942479-eff5-47ce-9be5-f42c74cfd257',
    reminderTime: {
      hour: 12,
      minute: 3,
    },
    scheduleNotificationId: '4ab1f79f-9304-4145-81cd-fc9d0f71c60b',
    title: 'Write code'
  }
  ]);
  const [isActiveEdit, setActiveEdit] = useState(false);
  let selectSoundObj = {};
  let deselectSoundObj = {};

  useEffect(() => {
    if (!lists.length) {
      setActiveEdit(false);
    }
    // console.log(lists);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });
    selectSoundObj = new Audio.Sound();
    deselectSoundObj = new Audio.Sound();
    const status = {
      shouldPlay: false
    };
    // eslint-disable-next-line global-require
    selectSoundObj.loadAsync(require('../../assets/audio/select.mp3'), status, false);
    // eslint-disable-next-line global-require
    deselectSoundObj.loadAsync(require('../../assets/audio/deselect.mp3'), status, false);
  }, [lists]);

  const selectSound = () => {
    selectSoundObj.playAsync();
  };
  const deselectSound = () => {
    deselectSoundObj.playAsync();
  };

  // Logic to add selection for today date and add the date in data
  const updateHabit = (day, id) => {
    const list = lists.find((l) => l.id === id);
    if (list.dates[day]) {
      list.dates[day] = !list.dates[day];
      selectSound();
    } else {
      list.dates[day] = true;
      deselectSound();
    }
    setList([...lists]);
  };

  const enableEdit = () => {
    setActiveEdit(!isActiveEdit);
  };
  const addList = () => {
    navigation.navigate('AddHabits', { addNewHabit });
  };
  const addNewHabit = (data = {}) => {
    // eslint-disable-next-line no-param-reassign
    data.id = uuidv4();
    lists.push(data);
    setList([...lists]);
  };
  const deleteLists = (id) => {
    const newList = lists.filter((l) => l.id !== id);
    setList(newList);
  };

  const editCompleteHabit = (list) => {
    console.log('newlist', list);
    const newList = lists.map((li) => (li.id === list.id ? list : li));
    setList([...newList]);
  };

  const showLists = isActiveEdit ? (
    <ShowDeletableLists lists={lists} deleteLists={deleteLists} />
  ) : (
    <ShowHabits
      navigation={navigation}
      lists={lists}
      updateHabit={updateHabit}
      editCompleteHabit={editCompleteHabit}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HabitsHeader
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
    marginTop: StatusBar.currentHeight,
    fontSize: 20
  },
});
