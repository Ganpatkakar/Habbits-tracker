import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService {
  static storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(`Error while storing data of ${key} `);
    }
  };

  static storeJsonData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(`Error while storing JSON data of ${key} `);
    }
  };

  static getData = async (key, cb) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (cb) {
        cb(value);
      } else {
        return value;
      }
    } catch (e) {
      console.log(`Error while fetching data of ${key} `);
    }
  };

  static getJsonData = async (key, cb, defaultVal = null) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : defaultVal;
      if (cb) {
        cb(value);
      } else {
        return value;
      }
    } catch (e) {
      console.log(`Error while fetching JSON data of ${key} `);
    }
  };
}
