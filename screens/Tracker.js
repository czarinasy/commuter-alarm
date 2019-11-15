import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "../components/GetLocation";

class Tracker extends React.Component {
  state = {
    latitude: 0,
    longitude: 0
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );
    console.log("pressed GetLocation button");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tracker</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <GetLocation onGetLocation={this.getLocationHandler} />
      </View>
    );
  }
}

export default Tracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  }
});
