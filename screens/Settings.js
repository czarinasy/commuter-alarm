import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
    Button
  } from "native-base";

class Settings extends React.Component {
  static navigationOptions = {
    title: "Settings",
    headerStyle:{
      backgroundColor: "lightskyblue"
    },
    headerTitleStyle:{
      marginLeft: 97,
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center"
    }
    
  };
  render() {
    return (
      <View style={styles.container}>
      <Button transparent
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("SetWarnDistance");
            console.log("pressed Distance button");
          }}
        >
          <Text style={styles.buttontxt}>Set Default Distance</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Ringtone");
            console.log("pressed Ringtone button");
          }}
        >
          <Text style={styles.buttontxt}>Set Ringtone</Text>
        </Button>
      </View>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center"
  },
  button: {
    // position: "absolute",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    height:70,
    justifyContent: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor:"lightsteelblue"
  },
  buttontxt: {
    color: "lightsteelblue",
    fontSize: 16
  },
  text: {
    fontSize: 30
  }
});
