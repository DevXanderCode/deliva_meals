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
      <View style={{flexDirection: 'row', height: 50, marginTop: SIZES?.base}}>
        <TouchableOpacity
          style={{
            ...styles?.headerImgContainer,
            paddingLeft: SIZES?.padding * 2,
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={styles?.headerImg}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS?.lightGray3,
              borderRadius: SIZES?.radius,
            }}>
            <Text style={{...FONTS.h3}}>Location</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            ...styles?.headerImgContainer,
            paddingRight: SIZES?.padding * 2,
          }}>
          <Image
            source={icons?.basket}
            resizeMode="contain"
            style={styles?.headerImg}
          />
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
  headerImg: {
    width: 30,
    height: 30,
  },
  headerImgContainer: {
    width: 50,
    justifyContent: 'center',
  },
});

export default Home;
