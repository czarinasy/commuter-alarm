import React from "react";
import { StyleSheet, Text, View } from "react-native";

class SideButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SideButton</Text>
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
