import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Alert,
  Vibration
} from "react-native";
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

import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

// The home screen can access multiple other screens through different navigation buttons
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      latitude: 0,
      longitude: 0,
      arrived: false
      // NOTIF
      //scheduled: false,
      //time: new Date().toLocaleString(),
      //scheduledTimes: []
    }),
      (this.destination = {
        latitude: 14.61828,
        longitude: 121.04976
      }),
      // NOTIF
      (this.sendPushNotification = this.sendPushNotification.bind(this));
  }
  makeVibration() {
    Vibration.vibrate();
  }
  //NOTIF
  /*createLocalNotification(timer, localestring) {
    try {
      const alertTime = new Date().getTime() + 500;
      const localNotification = {
        title: "Notification Scheduled at:",
        body: new Date(alertTime).toLocaleString(),
        ios: {
          sound: true
        },
        android: {
          sound: true,
          priority: "high",
          vibrate: true
        }
      };

      const schedulingOptions = {
        time: alertTime
      };

      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      )
        .then(id =>
          this.setState({
            scheduledTimes: [
              ...this.state.scheduledTimes,
              new Date(alertTime).toLocaleString()
            ],
            scheduled: true
          })
        )
        .catch(err => console.error("Error creating notification", err));
    } catch (e) {
      console.error("cannot create notification: " + e);
    }
  }*/
  // NOTIF
  sendPushNotification() {
    try {
      const alertTime = new Date().getTime() + 500;
      const localNotification = {
        title: "You are arriving at your stop soon.",
        body: new Date(alertTime).toLocaleString(),
        ios: {
          sound: true
        },
        android: {
          sound: true,
          priority: "high",
          vibrate: true
        }
      };

      Notifications.presentLocalNotificationAsync(localNotification);
      this.makeVibration();
      Alert.alert("You are arriving at your stop soon.");
    } catch (e) {
      console.error("cannot create notification: " + e);
    }
  }
  componentDidUpdate() {
    if (this.state.arrived) {
      this.sendPushNotification();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ arrived: true });
    }, 5000);

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

    // NOTIF
    Permissions.askAsync(Permissions.NOTIFICATIONS);
    //setTimeout(() => {
    this.setState({ time: new Date().toLocaleString() });
    //}, 1000);
  }

  render() {
    openDrawer = () => {
      this.drawer._root.open();
    };

    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Navbar")}
            >
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{ flex: 1 }}>
            <Text style={styles.text}>BA3</Text>
          </Body>

          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                console.log("POWER");
              }}
            >
              <Icon name="power" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Button
            iconLeft
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("SelectDestination");
              console.log("pressed SelectDestination button");
            }}
          >
            <Icon name="navigate" style={styles.icons} />
            <Text style={styles.buttontxt}>Select Destination</Text>
          </Button>
          <Content style={styles.distance}>
            <Item>
              <Icon active name="bicycle" style={styles.bike} />
              <Input
                placeholder="Input Distance"
                placeholderTextColor="gainsboro"
                style={styles.input}
                keyboardType={"numeric"}
              />
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

          <Button
            rounded
            style={styles.button2}
            onPress={this.sendPushNotification}
          >
            <Text style={styles.buttontxt2}>Start</Text>
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
        {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  buttontxt2: {
    color: "white",
    fontSize: 17
  },
  button2: {
    alignSelf: "center",
    width: 100,
    backgroundColor: "lightskyblue",
    marginTop: 15,
    justifyContent: "center"
  },
  bike: {
    marginLeft: 10,
    marginRight: 2,
    color: "lightskyblue"
  },
  buttontxt: {
    color: "lightsteelblue",
    marginLeft: 15
  },
  icons: {
    color: "lightskyblue"
  },
  textkm: {
    color: "lightsteelblue",
    marginRight: 10
    // justifyContent: "center",
  },
  distance: {
    flexDirection: "row",
    // alignItems:"center",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    marginBottom: 15
  },
  input: {
    // borderColor: "lightgrey",
    // borderWidth: 1,
    width: 252,
    height: 40,
    fontSize: 14,
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
    alignSelf: "center",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 15
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
    alignSelf: "center",
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    zIndex: -1
  },
  header: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "lightskyblue"
  }
});
