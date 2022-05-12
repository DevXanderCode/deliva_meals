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

  const mapView = React.useRef();

  React.useEffect(() => {
    let {restaurant, currentLocation} = route?.params;

    let fromLoc = currentLocation?.gps;
    let toLoc = restaurant?.location;
    let street = currentLocation?.streetName;

    console.log('Street', street);

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

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

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
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image source={icons?.car} style={styles?.carIcon} />
      </Marker>
    );
    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
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
              if (!isReady) {
                // fit route into map
                mapView.current.fitToCoordinates(result?.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                // reposition the car
                let nextLoc = {
                  latitude: result?.coordinates[0].latitude,
                  longitude: result?.coordinates[0].longitude,
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View style={styles?.headerContainer}>
        <View style={styles?.headerInnerContainer}>
          <Image source={icons.red_pin} style={styles?.headerImg} />
          <View style={{flex: 1}}>
            <Text style={FONTS.body3}>{streetName}</Text>
          </View>

          <Text style={FONTS.body3}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
    </View>
  );
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
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width * 0.9,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  headerImg: {
    width: 30,
    height: 30,
    marginRight: SIZES.padding,
  },
});

export default OrderDelivery;
