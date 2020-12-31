import React from 'react';
import { StyleSheet, View } from 'react-native';

const Separator = () => (
  <View style={stylesSeparator.separator} />
);

const stylesSeparator = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  separator: {
    marginVertical: 8,
    borderBottomColor: '#aaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Separator;
