import React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Drawer,
  Container,
  Footer,
  FooterTab,
  Content
} from "native-base";

import MapView, { Marker } from "react-native-maps";

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
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
    openDrawer = () => {
      this.drawer._root.open();
    };
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Icon name="menu"></Icon>
          </Left>

          <Body style={{ flex: 1 }}>
            <Text style={styles.text}>HomeScreen</Text>
          </Body>

          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon name="power"></Icon>
            </Button>
          </Right>
        </Header>
        <Content>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker coordinate={this.state}></Marker>
          </MapView>

          <Button
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("SelectDestination");
              console.log("pressed SelectDestination button");
            }}
          >
            <Text>Select Destination</Text>
          </Button>
          {/*
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
          />*/}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "#fff",
  },
  text: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 15
  },
  button: {
    position: "absolute",
    backgroundColor: "white",
    zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    padding: 15,
    margin: 15
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1
  },
  header: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: StatusBar.currentHeight
  }
});
