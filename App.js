import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "./components/GetLocation";

export default class App extends React.Component {
  getLocationHandler = () => {
    console.log("pressed button");
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      err => console.log(err)
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
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
