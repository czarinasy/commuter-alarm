import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Dimensions, StatusBar, Alert } from "react-native";
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
  });

  const setDestinationHandler = async selectedDestination => {
    if (selectedDestination) {
      setDestination(selectedDestination);
      if (destination) {
        console.log(
          "\n\n-------------------[HOMESCREEN] Selected Destination -------------------"
        );
        console.log(destination.address_components[0].long_name);
      }
    }
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

      <Button rounded style={styles.button2}>
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
