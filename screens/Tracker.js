import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "../components/GetLocation";
import { GOOGLE_API_KEY } from "../API_KEYS";

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  //console.log(degrees * (pi / 180));
  return degrees * (pi / 180);
}

class Tracker extends React.Component {
  state = {
    current: {
      latitude: 0,
      longitude: 0
    },
    destination: {
      latitude: 0,
      longitude: 0
    },
    eta: 0
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          current: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      err => console.log(err)
    );
    this.setState({
      destination: {
        latitude: this.props.navigation.getParam("destLat"),
        longitude: this.props.navigation.getParam("destLong")
      }
    });
  }
  getETA() {
    //console.log("getETA");
    //var orig = "14.6404507,121.0737046";
    var orig = this.state.current.latitude + "," + this.state.current.longitude;
    //var dest = "14.6368585,121.0744894";
    var dest =
      this.state.destination.latitude + "," + this.state.destination.longitude;
    var url =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
      orig +
      "&destinations=" +
      dest +
      "&key=" +
      GOOGLE_API_KEY();
    //console.log(url);
    const fetchDistMat = async () => {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    };

    fetchDistMat();
  }
  inRadius() {
    cLat = degrees_to_radians(this.state.current.latitude);
    cLong = degrees_to_radians(this.state.current.longitude);
    dLat = degrees_to_radians(this.state.destination.latitude);
    dLong = degrees_to_radians(this.state.destination.longitude);
    //console.log(cLat);
    difLat = cLat - dLat;
    difLong = cLong - dLong;

    a =
      Math.sin(difLat / 2) ** 2 +
      Math.cos(dLat) * Math.cos(cLat) * Math.sin(difLong / 2) ** 2;
    c = 2 * Math.asin(Math.sqrt(a));
    r = 6371;
    val = c * r;
    radius = 0.5;
    //console.log(val);
    if (val <= radius) {
      return "Inside the area";
    } else {
      return "Outside the area";
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.text}>Tracker</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
    <GetLocation onGetLocation={this.getLocationHandler} />*/}
        <Text>{this.props.navigation.getParam("destinationName")}</Text>

        <Text>{this.state.destination.latitude}</Text>
        <Text>{this.state.destination.longitude}</Text>
        <Text>{this.inRadius()}</Text>
        {this.getETA()}
      </View>
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
    fontSize: 30
  }
});
