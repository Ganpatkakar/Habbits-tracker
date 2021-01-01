// CustomText.js
import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default function CustomText({ style, children }) {
  return (
    <Text style={[styles.defaultStyle, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 14
  },
});
