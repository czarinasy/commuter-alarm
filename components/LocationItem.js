import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const LocationItem = props => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    locationFetchHandler = async () => {
      //the entiire location object from the Google Places API
      const res = await this.props.fetchDetails(this.props.place_id);
      console.log("result", res); //prints selected location item to console
      // Alert.alert("Selected Destination: " + res.name, JSON.stringify(res)); //shows selected item as alert on mobile

      setLocation(res);
      //passes the chosen location object to parent (SelectDestination)
      props.setDestinationFromChild(location);
    };
  }, [location]);

  return (
    <TouchableOpacity style={styles.root} onPress={locationFetchHandler}>
      <Text>{props.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    width: 300
  }
});
export default LocationItem;
