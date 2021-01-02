/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View, Alert
} from 'react-native';
import { Audio } from 'expo-av';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import HabitsHeader from './habitsComponents/habitsHeader';
import ShowHabits from './habitsComponents/showHabits';
import ShowDeletableLists from './habitsComponents/showDeletableLists';
import StorageService from '../utils/storageService';
import { STORAGE_LISTS } from '../utils/commonStrings';
import stylesCommon from '../utils/custom-text-style';

export default function HabitsScreen(props) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [lists, setList] = useState([]);
  const [isActiveEdit, setActiveEdit] = useState(false);
  let selectSoundObj = {};
  let deselectSoundObj = {};
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

  useEffect(() => {
    StorageService.getJsonData(STORAGE_LISTS, getStorageCallbak, []);
  }, []);

  useEffect(() => {
    if (!lists.length) {
      setActiveEdit(false);
    }
    StorageService.storeJsonData(STORAGE_LISTS, lists);
  }, [lists]);

  const getStorageCallbak = (value = []) => {
    setLoading(false);
    setList(value);
  };

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
    // setList([...lists]);
    getStorageCallbak([...lists]);
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
    // setList([...lists]);
    getStorageCallbak([...lists]);
  };

  const deleteLists = (id) => {

    Alert.alert(
      'Delete',
      'My Habit',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            const newList = lists.filter((l) => l.id !== id);
            // setList(newList);
            getStorageCallbak([...newList]);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const editCompleteHabit = (list) => {
    // console.log('newlist', list);
    const newList = lists.map((li) => (li.id === list.id ? list : li));
    // setList([...newList]);
    getStorageCallbak([...newList]);
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

  const loadingComponent = (
    <View style={styles.habitsContainer}>
      <Text style={stylesCommon.normalText}>Loading ...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HabitsHeader
        listsLength={lists.length}
        enableEdit={enableEdit}
        addList={addList}
        isActiveEdit={isActiveEdit}
      />
      {
        isLoading ? loadingComponent : showLists
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    fontSize: 20
  },
  habitsContainer: {
    padding: 5
  },
});
