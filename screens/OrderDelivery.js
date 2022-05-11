import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../constants';

const OrderDelivery = ({navigation, route}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    let {restaurant, currentLocation} = route?.params;

    let fromLoc = currentLocation?.gps;
    let toLoc = restaurant?.location;
    let street = currentLocation?.streetName;

    let mapRegion = {
      latitude: (fromLoc?.latitude + toLoc?.latitude) / 2,
      longitude: (fromLoc?.longitude + toLoc?.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc?.latitude - toLoc?.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc?.longitude - toLoc?.longitude) * 2,
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [route?.params]);

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View style={styles?.markerContainer}>
          <View style={[styles?.markerView, {borderRadius: 20}]}>
            <Image source={icons?.pin} style={styles?.markerIcon} />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker coordinate={fromLocation} anchor={{x: 0.5, y: 0.5}} flat={true}>
        <Image source={icons?.car} style={styles?.carIcon} />
      </Marker>
    );
    return (
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{
            flex: 1,
          }}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS?.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result?.duration);
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }
  return <View style={{flex: 1}}>{renderMap()}</View>;
};

const styles = StyleSheet.create({
  markerContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS?.white,
  },
  markerView: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS?.primary,
  },
  markerIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS?.white,
  },
  carIcon: {
    width: 40,
    height: 40,
  },
});

export default OrderDelivery;
