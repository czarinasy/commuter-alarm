import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Tracker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tracker</Text>
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
