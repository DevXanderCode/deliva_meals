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

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}>
        {restaurant?.menu?.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <Text style={FONTS.body1}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles?.container}>
      {renderHeader()}
      {renderFoodInfo()}
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
