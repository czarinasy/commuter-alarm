import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "./components/GetLocation";

export default class App extends React.Component {
  state = {
    latitude: 0,
    longitude: 0
  };

  getLocationHandler = () => {
    console.log("pressed button");
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>

        <GetLocation onGetLocation={this.getLocationHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
