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
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES?.padding,
            justifyContent: 'center',
          }}>
          <Image source={icons.nearby} />
        </TouchableOpacity>
      </View>
    );
  }
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
