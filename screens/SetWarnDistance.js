import React from "react";
import { StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container
} from "native-base";

class SetWarnDistance extends React.Component {
  static navigationOptions = {
    drawerLabel: ()=>null
  };

  render() {
    return (
    <Container>
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={ () => this.props.navigation.navigate("Settings")}>
          <Icon name="ios-arrow-round-back"/>
          </Button>
        </Left>
  
        <Body style={{ flex: 1 }}>
          <Text style={styles.text}>Distances</Text>
        </Body>
  
        <Right style={{ flex: 1 }}>
        </Right>
      </Header>
      <ScrollView style={styles.container}>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 1 button")
          }}
        >
          <Text style={styles.buttontxt}>1</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 2 button")
          }}
        >
          <Text style={styles.buttontxt}>2</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 3 button")
          }}
        >
          <Text style={styles.buttontxt}>3</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 4 button")
          }}
        >
          <Text style={styles.buttontxt}>4</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 5 button")
          }}
        >
          <Text style={styles.buttontxt}>5</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 6 button")
          }}
        >
          <Text style={styles.buttontxt}>6</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 7 button")
          }}
        >
          <Text style={styles.buttontxt}>7</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 8 button")
          }}
        >
          <Text style={styles.buttontxt}>8</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 9 button")
          }}
        >
          <Text style={styles.buttontxt}>9</Text>
        </Button>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed 10 button")
          }}
        >
          <Text style={styles.buttontxt}>10</Text>
        </Button>
      </ScrollView>
      </Container>
    );
  }
}

export default SetWarnDistance;

const styles = StyleSheet.create({
  container: {
    alignContent:"center"
  },
  text: {
    alignSelf:"center",
    color: "white",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: "bold"
  },
    header: {
      paddingRight: 15,
      paddingLeft: 15,
      height: 70,
      //marginTop: StatusBar.currentHeight,
      backgroundColor: "lightskyblue",
      paddingTop: 14
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
});
