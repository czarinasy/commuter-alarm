import React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container,
  Content,
  Item,
  Input
} from "native-base";

import MapView, { Marker } from "react-native-maps";
const API_KEY = "AIzaSyCMaoEDwHYWZ-eXOnTfg6SaSR8xSqrg_gM";

const destination = { latitude: 37.771707, longitude: -122.4053769 };

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  static navigationOptions={
    drawerLabel: "Home"
  };
  constructor(props) {
    super(props);
    (this.state = {
      latitude: 0,
      longitude: 0
    }),
      (this.destination = {
        latitude: 14.61828,
        longitude: 121.04976
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log(this.state);
      },
      err => console.log(err)
    );
  }
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1, marginTop: StatusBar.currentHeight-10 }}>
            <Button transparent onPress={ () => this.props.navigation.openDrawer() }
            style = {{justifyContent: "center"}}>
            <Icon name="menu"/>
            </Button>
          </Left>

          <Body style={{ flex: 1, marginTop: StatusBar.currentHeight-10 }}>
            <Text style={styles.text}>BA3</Text>
          </Body>

          <Right style={{ flex: 1, marginTop: StatusBar.currentHeight-10 }}>
            <Button transparent onPress={()=>{console.log("POWER")}}>
              <Icon name="power"/>
            </Button>
          </Right>
        </Header>
        <Content>
        <Button iconLeft
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("SelectDestination");
              console.log("pressed SelectDestination button");
            }}
          >
            <Icon name="navigate" style={styles.icons}/>
            <Text style={styles.buttontxt}>Select Destination</Text>
          </Button>
          <Content style={styles.distance}>
          <Item >
          <Icon active name="bicycle" style={styles.bike}/>
        <Input placeholder="Input Distance" 
    placeholderTextColor= "gainsboro" style={styles.input} keyboardType={"numeric"}/>
          <Text style={styles.textkm}>km</Text>
          </Item>
          </Content>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            rotateEnabled={false}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker coordinate={this.destination}></Marker>
          </MapView>

          <Button rounded style={styles.button2}>
            <Text style = {styles.buttontxt2}>Start</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  buttontxt2:{
    color: "white",
    fontSize: 17
  },
  button2:{
    alignSelf: "center",
    width: 100,
    backgroundColor: "lightskyblue",
    marginTop: 15,
    justifyContent: "center"
  },
  bike:{
    marginLeft: 10,
    marginRight: 2,
    color: "lightskyblue"
  },
  buttontxt:{
    color: "lightsteelblue",
    marginLeft:15
  },
  icons:{
    color: "lightskyblue"
  },
  textkm:{
    color: "lightsteelblue",
    marginRight: 10
    // justifyContent: "center",
  },
  distance:{
    flexDirection:"row",
    // alignItems:"center",
    width: Dimensions.get("window").width * 0.9,
    alignSelf:"center",
    marginBottom: 15
  },
  input: {
    // borderColor: "lightgrey",
    // borderWidth: 1,
    width: 252,
    height: 40,
    fontSize:14,
    // textAlign: "center",
    alignSelf: "center",
    // marginRight: 20,
    color: "lightsteelblue"
    // marginBottom: 15
  },
  container: {
    flex: 1
    //backgroundColor: "#fff",
  },
  text: {
    alignSelf:"center",
    color: "white",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: "bold"
  },
  button: {
    // position: "absolute",
    backgroundColor: "white",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    margin: 15,
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  mapStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    zIndex: -1
  },
  header: {
    paddingRight: 15,
    paddingLeft: 15,
    height: 70,
    //marginTop: StatusBar.currentHeight,
    backgroundColor: "lightskyblue"
  }
});
