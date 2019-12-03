import React from "react";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import {
    Button
  } from "native-base";

class Navbar extends React.Component {
    static navigationOptions = {
      headerStyle:{
        backgroundColor: "lightskyblue"
      }
      
    };
  render() {
    return (
      <View style={styles.container}>
        <Button transparent
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("HomeScreen");
              console.log("pressed Home button");
            }}
          >
            <Text style={styles.buttontxt}>Home</Text>
          </Button>
          <Button transparent
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("MyFavorites");
              console.log("pressed Favorites button");
            }}
          >
            <Text style={styles.buttontxt}>My Favorites</Text>
          </Button>
          <Button transparent
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Settings");
              console.log("pressed Settings button");
            }}
          >
            <Text style={styles.buttontxt}>Settings</Text>
          </Button>
      </View>
    );
  }
}

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightskyblue",
    alignItems: "center",
    //justifyContent: "center"
  },
  icons:{
    color: "lightskyblue"
  },
  buttontxt: {
    color: "white",
    fontSize: 16
  },
  button: {
    // position: "absolute",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    height: 70,
    justifyContent: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white"
  }
});
