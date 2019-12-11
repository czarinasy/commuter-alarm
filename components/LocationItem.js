import React from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const LocationItem = props => {
  const selectLocationHandler = async () => {
    const location = await props.fetchDetails(props.place_id);
    console.log(
      "\n\n-------------------[LOCATION ITEM] Selected Location: -------------------"
    );
    console.log(location.address_components[0].long_name);
    Alert.alert(
      "Selected Destination: " + location.address_components[0].long_name
    );
    props.onSetLocation(location);
  };

  return (
    <TouchableOpacity style={styles.root} onPress={selectLocationHandler}>
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
