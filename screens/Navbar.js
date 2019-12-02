import React from "react";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import {
    Header,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Container,
    Footer,
    FooterTab,
    Content,
    Item,
    Input
  } from "native-base";

class Navbar extends React.Component {
    static navigationOptions = {
      title: "Navbar",
      headerStyle:{
        backgroundColor: "lightskyblue"
      },
      headerTitleStyle:{
        fontSize: 15,
        color: "white",
        fontWeight: "normal",
        alignSelf: "center"
      }
      
    };
  render() {
    return (
      <View style={styles.container}>
        <Button transparent
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Settings");
              console.log("pressed Settings button");
            }}
          >
            <Text style={styles.buttontxt}>Settings</Text>
          </Button>
          <Button transparent
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Notifications");
              console.log("pressed Notifications button");
            }}
          >
            <Text style={styles.buttontxt}>Notifications</Text>
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
    margin: 15,
    justifyContent: "center",
    alignSelf: "center"
  }
});
