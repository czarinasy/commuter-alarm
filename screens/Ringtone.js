import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "native-base";

const Ringtone = () => {
  return (
    <View style={styles.container}>
      <Button
        transparent
        style={styles.button}
        onPress={() => {
          console.log("pressed Vibration button");
        }}
      >
        <Text style={styles.buttontxt}>Vibration</Text>
      </Button>
      <Button
        transparent
        style={styles.button}
        onPress={() => {
          console.log("pressed Current button");
        }}
      >
        <Text style={styles.buttontxt}>Current</Text>
      </Button>
    </View>
  );
};

export default Ringtone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
    // justifyContent: "center"
  },
  headerTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "normal",
    alignSelf: "center"
  },
  button: {
    // position: "absolute",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    height: 70,
    justifyContent: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "lightsteelblue"
  },
  buttontxt: {
    color: "lightsteelblue",
    fontSize: 16
  },
  text: {
    fontSize: 30
  }
});
