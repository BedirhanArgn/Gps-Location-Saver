import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Button,
  Modal,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GeoCoordinates } from "react-native-geolocation-service";
import * as Location from "expo-location";
import ModalComponent from "../../components/Modal/Modal";
const HomeScreen = () => {
  const [position, setPosition] = useState<GeoCoordinates>(
    {} as GeoCoordinates
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const showTitleBox = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const getGPSPermission = async () => {
      Location.installWebGeolocationPolyfill();
      const permisson = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (permisson === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("PER", permisson);
        
        navigator.geolocation.getCurrentPosition(
          (position) => {           
            setPosition(position.coords);
            setModalVisible(true);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          {  enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 }
        );
      }
    };
    getGPSPermission();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (position && position.latitude) {
        let response = await Location.reverseGeocodeAsync({
          latitude: position.latitude || 41.015137,
          longitude: position.longitude || 28.97953,
        });

        for (let item of response) {
          const address = `${item.district}, ${item.street}, ${item.subregion}, ${item.country}`;

          setUserAddress(address);
        }
      }
    };
    getAddress();
  }, [position]);

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="dark-content" />
        {position && position.latitude ? (
          <>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: position.latitude ? position.latitude : 0,
                  longitude: position.longitude ? position.longitude : 0,
                }}
                pinColor={"red"}
                onPress={() => showTitleBox()}
              />
            </MapView>
            <ModalComponent
              visible={modalVisible}
              animationType={"fade"}
              transparent={true}
              title={"Konumu Kaydet"}
              text={`Belirtilen konumu kayıt etmek ister misiniz? ${userAddress}`}
              closeModal={() => setModalVisible(false)}
            >
              <View>
                <Text style={styles.title}>Konumu Kayıt</Text>
                <Text style={{ textAlign: "left" }}>Adres:</Text>
              </View>
            </ModalComponent>
          </>
        ) : (
          <SafeAreaView style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </>
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
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20,
  },
});

export default HomeScreen;
