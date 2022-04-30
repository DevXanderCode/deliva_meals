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
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    let {item, currentLocation} = route?.params;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route?.params]);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice(); //duplicates the order items using slice method
    let item = orderList.filter(a => a?.menuId === menuId);
    if (action === '+') {
      if (item?.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId,
          qty: 1,
          price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item?.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0]?.qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter(a => a.menuId === menuId);

    if (orderItem?.length > 0) {
      return orderItem[0]?.qty;
    }
    return 0;
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b?.qty || 0), 0);

    return itemCount.toLocaleString('en');
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b?.total || 0), 0);

    return total.toFixed(2).toLocaleString('en');
  }

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
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
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
                  ...styles?.flexRow,
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => {
                    editOrder('-', item?.menuId, item?.price);
                  }}>
                  <Text style={FONTS.body1}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    backgroundColor: COLORS.white,
                  }}>
                  <Text style={FONTS.h2}>{getOrderQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    editOrder('+', item?.menuId, item?.price);
                  }}
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}>
                  <Text style={FONTS.body1}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{marginVertical: 10, textAlign: 'center', ...FONTS.h2}}>
                {item?.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={FONTS.body3}>{item?.description}</Text>
            </View>

            <View style={{...styles?.flexRow, marginTop: 10}}>
              <Image
                source={icons.fire}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{...FONTS?.body3, color: COLORS.darkgray}}>
                {item?.calories.toFixed(2)} Cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={styles?.dotsContainer}>
        <View style={styles?.dotSubContainer}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [
                COLORS?.darkgray,
                COLORS?.primary,
                COLORS?.darkgray,
              ],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                opacity={opacity}
                key={`dot-${index}`}
                style={{
                  ...styles?.dotStyle,
                  backgroundColor: dotColor,
                  width: dotSize,
                  height: dotSize,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View style={styles?.orderContainer}>
          <View style={styles?.itemDetails}>
            <Text style={FONTS.h3}>{getBasketItemCount()} items in cart</Text>
            <Text style={FONTS.h3}>${sumOrder()}</Text>
          </View>

          <View style={styles?.orderHeader}>
            <View style={styles.flexRow}>
              <Image
                source={icons?.pin}
                resizeMode="contain"
                style={styles.iconImg}
              />

              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                Location
              </Text>
            </View>
            <View style={styles?.flexRow}>
              <Image
                resizeMode="contain"
                source={icons.master_card}
                style={styles?.iconImg}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                67890
              </Text>
            </View>
          </View>

          {/* order Button */}
          <View style={styles?.orderBtnContainer}>
            <TouchableOpacity
              style={styles.orderBtn}
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isIphoneX() && <View style={styles?.emptyView} />}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles?.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
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
  dotsContainer: {
    height: 30,
  },
  dotStyle: {
    borderRadius: SIZES.radius,
    marginHorizontal: 6,
  },
  dotSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding,
  },
  emptyView: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: COLORS.white,
  },
  orderBtn: {
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  orderBtnContainer: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImg: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
  },
  flexRow: {flexDirection: 'row'},
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  orderContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },
});

export default Restaurant;
