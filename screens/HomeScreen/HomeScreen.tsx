import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation, { GeoCoordinates } from "react-native-geolocation-service";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [position, setPosition] = useState<GeoCoordinates>(
    {} as GeoCoordinates
  );

  useEffect(() => {
    const getGPSPermission = async () => {
      Location.installWebGeolocationPolyfill();
      const permisson = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (permisson) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);

            setPosition(position.coords);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          }
        );
      }
    };
    getGPSPermission();
  }, []);

  return (
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <StatusBar barStyle="dark-content" />
      {position && position.latitude ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: position.latitude ? position.latitude : 0,
              longitude: position.longitude ? position.longitude : 0,
            }}
            pinColor={"red"}
          />
        </MapView>
      ): <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
  }
});

export default HomeScreen;
