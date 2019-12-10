import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "../components/GetLocation";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container
} from "native-base";

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  console.log(degrees * (pi / 180));
  return degrees * (pi / 180);
}

class Tracker extends React.Component {
  static navigationOptions = {
    drawerLabel: ()=>null
  };
  state = {
    current: {
      latitude: 0,
      longitude: 0
    },
    destination: {
      latitude: 0,
      longitude: 0
    }
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );
    console.log("pressed GetLocation button");
  };
  render() {
    return (
    <Container>
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={ () => this.props.navigation.navigate("HomeScreen")}>
          <Icon name="ios-arrow-round-back"/>
          </Button>
        </Left>
  
        <Body style={{ flex: 1 }}>
          <Text style={styles.text}>Tracker</Text>
        </Body>
  
        <Right style={{ flex: 1 }}>
        </Right>
      </Header>
      <View style={styles.container}>
        {/*<Text style={styles.text}>Tracker</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
    <GetLocation onGetLocation={this.getLocationHandler} />*/}
        <Text>{this.props.navigation.getParam("destinationName")}</Text>
        <Text>{this.state.destination.latitude}</Text>
        <Text>{this.state.destination.longitude}</Text>
        <Text>{this.inRadius()}</Text>
      </View>
      </Container>
    );
  }
}

export default Tracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
  }
});
