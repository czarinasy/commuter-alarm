import React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";

import MapView, { Marker } from "react-native-maps";
const API_KEY = "AIzaSyCMaoEDwHYWZ-eXOnTfg6SaSR8xSqrg_gM";

const destination = { latitude: 37.771707, longitude: -122.4053769 };

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      latitude: 0,
      longitude: 0
    }),
      (this.destination = {
        latitude: 14.61828,
        longitude: 121.04976
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log(this.state);
      },
      err => console.log(err)
    );
  }
  render() {
    openDrawer = () => {
      this.drawer._root.open();
    };
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam("destinationName")}</Text>
        <Text>{this.props.navigation.getParam("placeID")}</Text>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          rotateEnabled={false}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker placeID></Marker>
        </MapView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "#fff",
  },
  text: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 15
  },
  button: {
    position: "absolute",
    backgroundColor: "white",
    zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    padding: 15,
    margin: 15
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1
  },
  header: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: StatusBar.currentHeight
  }
});
