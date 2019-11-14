import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class SelectDestination extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SelectDestination</Text>
      </View>
    );
  }
}

export default SelectDestination;

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
