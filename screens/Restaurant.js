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

import {Icons, COLORS, SIZES, FONTS} from '../constants';

const Restaurant = ({navigation, route}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    let {item, currentLocation} = route?.params;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route?.params]);

  function renderHeader() {
    return <View />;
  }

  return (
    <SafeAreaView style={styles?.container}>{renderHeader()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.lightGray2,
  },
});

export default Restaurant;
