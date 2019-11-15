import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// For now it's a full screen
// But it will eventually have to be a half screen page
class Sidebar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sidebar</Text>
        <Button title="Home" onPress={() => this.props.navigation.popToTop()} />
        <Button
          title="MyFavorites"
          onPress={() => this.props.navigation.navigate("MyFavorites")}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
      </View>
    );
  }
}

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