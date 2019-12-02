import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

class LocationItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locationObject: null
    };
  }

  _handlePress = async () => {
    //the entiire location object from the Google Places API
    const res = await this.props.fetchDetails(this.props.place_id);

    console.log("result", res); //prints selected location item to console

    Alert.alert("Selected Destination: " + res.name, JSON.stringify(res)); //shows selected item as alert on mobile

    this.setState({
      //sets the details of the chosen location(this one) that will be passed to parent file(SelectDestination)
      locationObject: res
    });
    //passes the chosen location object to parent (SelectDestination)

    this.props.setDestinationFromChild(this.state);
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
