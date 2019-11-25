import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

class LocationItem extends PureComponent {
  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    //console.log(res.place_id);
    console.log("result", res);
    Alert.alert("Selected Destination: " + res.name, JSON.stringify(res));
  };

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    width: 300
  }
});
export default LocationItem;