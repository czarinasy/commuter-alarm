import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Alert,
  Vibration
} from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container,
  Content,
  Item,
  Input
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import SelectDestination from "../components/SelectDestination";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { GOOGLE_API_KEY } from "../API_KEYS";
import { Audio } from "expo-av";
import { Notifications } from "expo";

let destName = "";
let destLat = 0;
let destLong = 0;
let arrived = false;
let currentLat = 0;
let currentLong = 0;

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  //console.log(degrees * (pi / 180));
  return degrees * (pi / 180);
}
function makeVibration() {
  const PATTERN = [1000, 2000, 3000];
  Vibration.vibrate(PATTERN, true);
}

// NOTIF
// call this.sendPushNotification when user has entered circle
function sendPushNotification() {
  try {
    const alertTime = new Date().getTime() + 500;
    const localNotification = {
      title: "You are arriving at your stop soon.",
      body: new Date(alertTime).toLocaleString(),
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: "high",
        vibrate: true
      }
    };
    Notifications.presentLocalNotificationAsync(localNotification);
    makeVibration();
    handlePlaySound();
  } catch (e) {
    console.error("cannot create notification: " + e);
  }
}
handlePlaySound = async () => {
  const soundObject = new Audio.Sound();
  const alertTime = new Date().getTime();
  try {
    let source = require("../assets/ring.mp3");
    await soundObject.loadAsync(source);
    Alert.alert(
      "You are arriving at your stop soon.",
      new Date(alertTime).toLocaleString(),
      [
        {
          text: "OK",
          onPress: () => {
            Vibration.cancel();
            soundObject.stopAsync();
            console.log("Cancel Pressed");
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
    await soundObject
      .playAsync()
      .then(async playbackStatus => {
        setTimeout(() => {
          soundObject.unloadAsync();
        }, playbackStatus.playableDurationMillis);
      })

      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
getETA = () => {
  const fetchDistMat = async () => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
        "14.6395" +
        "," +
        "121.078" +
        "&destinations=" +
        destLat +
        "," +
        destLong +
        "&key=" +
        GOOGLE_API_KEY()
    );
    const json = await response.json();
    console.log(json);
  };
  fetchDistMat();
};
function inRadius() {
  cLat = degrees_to_radians(currentLat);
  cLong = degrees_to_radians(currentLong);
  dLat = degrees_to_radians(destLat);
  dLong = degrees_to_radians(destLong);
  //console.log(cLat);
  const difLat = cLat - dLat;
  const difLong = cLong - dLong;

  const a =
    Math.sin(difLat / 2) ** 2 +
    Math.cos(dLat) * Math.cos(cLat) * Math.sin(difLong / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371;
  const val = c * r;
  const radius = 0.5;
  //console.log(val);
  if (val <= radius) {
    console.log("inside");
    arrived = true;
    sendPushNotification();
    //return "Inside the area";
  } else {
    console.log("outside");
    //arrived = false;
    //return "Outside the area";
  }
}
const HomeScreen = () => {
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      return await Font.loadAsync({
        righteous: require("../node_modules/native-base/Fonts/Roboto.ttf")
      });
      setIsFontReady(true);
    };
    loadFont();
    Permissions.askAsync(Permissions.NOTIFICATIONS);
  });

  const [current, setCurrent] = useState({
    latitude: 14.6395,
    longitude: 121.0781,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  });

  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    const permisionsHandler = async () => {
      const { status } = await Permissions.askAsync(
        Permissions.LOCATION
      ).catch(error => console.error(error));
      if (status === "granted") {
        navigator.geolocation.getCurrentPosition(pos => {
          setCurrent({
            ...current,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        });
      } else {
        Alert.alert(
          "PERMISSION DENIED",
          "Permission to access location was denied.",
          [{ text: "Okay", style: "cancel" }]
        );
      }
    };
    permisionsHandler();
    /*if (arrived) {
      sendPushNotification();
    }*/
    currentLat = current.latitude;
    currentLong = current.longitude;
  });

  const setDestinationHandler = async selectedDestination => {
    if (selectedDestination) {
      setDestination(selectedDestination);
      if (destination) {
        console.log(
          "\n\n-------------------[HOMESCREEN] Selected Destination -------------------"
        );
        console.log(destination.address_components[0].long_name);
        console.log(destination.geometry.location.lat);
        console.log(destination.geometry.location.lng);
        destName = destination.address_components[0].long_name;
        destLat = destination.geometry.location.lat;
        destLong = destination.geometry.location.lng;
        console.log(destName);
      }
    }
  };

  const fetchDistMat = async () => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
        current.latitude +
        "," +
        current.longitude +
        "&destinations=" +
        destLat +
        "," +
        destLong +
        "&key=" +
        GOOGLE_API_KEY()
    );
    const json = await response.json();
    console.log(json);
  };
  const checkVariables = () => {
    console.log("check variables");
    console.log(destName);
    console.log(destLat);
    console.log(destLong);
    console.log("eta");
    console.log(current);
    //console.log(destination);

    fetchDistMat();
    //sendPushNotification();
    console.log("rad");
    inRadius();
  };
  return (
    <Container>
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button
            transparent
            // onPress={}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          {isFontReady && <Text style={styles.text}>BA3</Text>}
        </Body>

        <Right style={{ flex: 1 }}>
          <Button
            transparent
            onPress={() => {
              console.log("POWER");
            }}
          >
            <Icon name="power" />
          </Button>
        </Right>
      </Header>
      <SelectDestination onSelect={setDestinationHandler} />
      <Content style={styles.distance}>
        <Item>
          <Icon active name="bicycle" style={styles.bike} />
          <Input
            placeholder="Input Distance"
            placeholderTextColor="gainsboro"
            style={styles.input}
            keyboardType={"numeric"}
          />
          <Text style={styles.textkm}>km</Text>
        </Item>
      </Content>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        rotateEnabled={false}
        region={{
          latitude: current.latitude,
          longitude: current.longitude,
          latitudeDelta: current.latitudeDelta,
          longitudeDelta: current.longitudeDelta
        }}
      >
        <Marker coordinate={destination}></Marker>
      </MapView>

      <Button rounded style={styles.button2} onPress={checkVariables}>
        <Text style={styles.buttontxt2}>Start</Text>
      </Button>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttontxt2: {
    color: "white",
    fontSize: 17
  },
  button2: {
    alignSelf: "center",
    width: 100,
    backgroundColor: "lightskyblue",
    marginTop: 15,
    justifyContent: "center"
  },
  bike: {
    marginLeft: 10,
    marginRight: 2,
    color: "lightskyblue"
  },
  buttontxt: {
    color: "lightsteelblue",
    marginLeft: 15
  },
  icons: {
    color: "lightskyblue"
  },
  textkm: {
    color: "lightsteelblue",
    marginRight: 10
    // justifyContent: "center",
  },
  distance: {
    flexDirection: "row",
    // alignItems:"center",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    marginBottom: 15
  },
  input: {
    // borderColor: "lightgrey",
    // borderWidth: 1,
    width: 252,
    height: 40,
    fontSize: 14,
    // textAlign: "center",
    alignSelf: "center",
    // marginRight: 20,
    color: "lightsteelblue"
    // marginBottom: 15
  },
  container: {
    flex: 1
    //backgroundColor: "#fff",
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 15
  },
  button: {
    // position: "absolute",
    backgroundColor: "white",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    margin: 15,
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  mapStyle: {
    alignSelf: "center",
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    zIndex: -1
  },
  header: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "lightskyblue"
  }
});
