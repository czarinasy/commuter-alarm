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
          onPress={() => this.props.navigation.navigate("SelectDestination")}
        />
        <Button
          title="SetWarnDistance"
          onPress={() => this.props.navigation.navigate("SetWarnDistance")}
        />
        <Button
          title="Sidebar"
          onPress={() => this.props.navigation.navigate("Sidebar")}
        />
        <Button
          title="Tracker"
          onPress={() => this.props.navigation.navigate("Tracker")}
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
