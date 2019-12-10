import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";

// For now it's a full screen
// But it will eventually have to be a half screen page
const Sidebar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sidebar</Text>
      <Button
        title="Home"
        onPress={() => {
          this.props.navigation.popToTop();
          console.log("pressed Home button");
        }}
      />
      <Button
        title="MyFavorites"
        onPress={() => {
          this.props.navigation.navigate("MyFavorites");
          console.log("pressed MyFavorite button");
        }}
      />
      <Button
        title="Settings"
        onPress={() => {
          this.props.navigation.navigate("Settings");
          console.log("pressed Settings button");
        }}
      />
    </View>
  );
};

export default Sidebar;

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
