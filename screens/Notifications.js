import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
    </View>
  );
};

export default Notifications;

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
