import React from 'react';
import {
  View, Text, SafeAreaView, StatusBar, StyleSheet
} from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>Settings screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
