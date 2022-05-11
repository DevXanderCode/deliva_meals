import React from 'react';
import {View, Text} from 'react-native';

const OrderDelivery = () => {
  function renderMap() {
    return <View></View>;
  }
  return (
    <View style={{flex: 1}}>
      {renderMap()}
      <Text>Order Delivery</Text>
    </View>
  );
};

export default OrderDelivery;
