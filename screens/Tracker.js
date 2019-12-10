import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GetLocation from "../components/GetLocation";
import { GOOGLE_API_KEY } from "../API_KEYS";

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  //console.log(degrees * (pi / 180));
  return degrees * (pi / 180);
}

const Tracker = () => {
  const [current, setCurrent] = useState({ latitude: 0, longitude: 0 });

  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });

  const [eta, setEta] = useState(0);

  // Distance Matrix: tracks ETA everytime current and/or destination changes
  useEffect(
    (getETA = () => {
      const fetchDistMat = async () => {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
            current.latitude +
            "," +
            current.longitude +
            "&destinations=" +
            destination.latitude +
            "," +
            destination.longitude +
            "&key=" +
            GOOGLE_API_KEY()
        );
        const json = await response.json();
        console.log(json);
      };
      fetchDistMat();
    }),
    [current, destination]
  );

  const inRadius = () => {
    cLat = degrees_to_radians(current.latitude);
    cLong = degrees_to_radians(current.longitude);
    dLat = degrees_to_radians(destination.latitude);
    dLong = degrees_to_radians(destination.longitude);
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
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.text}>Tracker</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
    <GetLocation onGetLocation={this.getLocationHandler} />*/}
      <Text>{destinationName}</Text>

      <Text>{destination.latitude}</Text>
      <Text>{destination.longitude}</Text>
      <Text>{inRadius}</Text>
      {getETA}
    </View>
  );
};

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
