import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
        <Button
          title="SelectDestination"
          onPress={() => {
            this.props.navigation.navigate("SelectDestination");
            console.log("pressed SelectDestination button");
          }}
        />
        <Button
          title="SetWarnDistance"
          onPress={() => {
            this.props.navigation.navigate("SetWarnDistance");
            console.log("pressed SetWarnDistance button");
          }}
        />
        <Button
          title="Sidebar"
          onPress={() => {
            this.props.navigation.navigate("Sidebar");
            console.log("pressed Sidebar button");
          }}
        />
        <Button
          title="Tracker"
          onPress={() => {
            this.props.navigation.navigate("Tracker");
            console.log("pressed Tracker button");
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;

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
