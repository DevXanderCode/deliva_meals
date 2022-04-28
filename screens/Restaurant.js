import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {Icons, COLORS, SIZES, FONTS, icons} from '../constants';

const Restaurant = ({navigation, route}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    let {item, currentLocation} = route?.params;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route?.params]);

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            paddingLeft: SIZES?.padding * 2,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles?.headerImg} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES?.padding * 3,
              borderRadius: SIZES?.radius,
              backgroundColor: COLORS?.lightGray3,
            }}>
            <Text style={FONTS.h3}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            paddingRight: SIZES.padding * 2,
          }}
          onPress={() => {}}>
          <Image source={icons.list} style={styles.headerImg} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles?.container}>
      {renderHeader()}
      {/* <Text>header</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.lightGray2,
  },
  headerImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Restaurant;
