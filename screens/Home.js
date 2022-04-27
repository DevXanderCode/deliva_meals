import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, icons, images, SIZES, FONTS} from '../constants';

const Home = () => {
  return (
    <SafeAreaView style={styles?.container}>{renderHeader()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default Home;
