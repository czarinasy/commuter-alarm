import React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";

import MapView, { Marker } from "react-native-maps";
const GOOGLE_API_KEY = "AIzaSyB8NsyHAo3C-dtiZOnAeKBPl0qU7ckgTAQ";

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        latitude: 0,
        longitude: 0,
        destID: " "
      },
      warnDist: 0
    };
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          current: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        console.log(this.state);
      },
      err => console.log(err)
    );
    this.setState({
      destination: {
        latitude: this.props.navigation.getParam("destLat"),
        longitude: this.props.navigation.getParam("destLong"),
        destID: this.props.navigation.getParam("placeID")
      }
    });
    this.setState({ warnDist: this.props.navigation.getParam("warnDist") });
    console.log(this.state);
  }

  render() {
    openDrawer = () => {
      this.drawer._root.open();
    };
    return (
      <View style={styles.container}>
        <Text>{this.state.current.latitude}</Text>
        <Text>{this.state.current.longitude}</Text>

        <Text>{this.state.destination.latitude}</Text>
        <Text>{this.state.destination.longitude}</Text>

        <Text>{this.state.warnDist}</Text>

        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          rotateEnabled={false}
          region={{
            latitude: this.state.current.latitude,
            longitude: this.state.current.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Circle
            center={this.state.destination}
            radius={this.state.warnDist * 1000} //in meters
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="#80bfff"
          />
          <Marker coordinate={this.state.destination} />
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
