import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Picker
} from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "../components/LocationItem";
const API_KEY = "AIzaSyCMaoEDwHYWZ-eXOnTfg6SaSR8xSqrg_gM";

class SelectDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDestination: null, //location object from the selected child prop gets passed here
      warningDistance: null
    };
  }

  //handles the setting of state from child(ListItem) to parent(this file)
  setDestinationFromChild = dataFromChild => {
    this.setState({ selectedDestination: dataFromChild });

    //for testing
    console.log(
      "\n\n-------------------THE CHOSEN LOCATION:-------------------"
    );
    console.log(
      this.state.selectedDestination.locationObject.address_components[0]
        .long_name
    );
    console.log(this.state.selectedDestination.locationObject.place_id);
    console.log(this.state.selectedDestination.geometry.location);
  };

  printSelectedDestination() {
    if (this.state.selectedDestination == null) {
      return "None Selected";
    } else {
      return this.state.selectedDestination.locationObject.address_components[0]
        .long_name;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Where are you going?</Text>
        <Text>Selected Destination: </Text>
        <Text>{this.printSelectedDestination()}</Text>

        {/*GOOGLE PLACES API*/}
        <GoogleAutoComplete
          apiKey={API_KEY}
          debounce={500}
          minLength={3}
          components="country:ph"
        >
          {({
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            inputValue
          }) => (
            <React.Fragment>
              {console.log("locationResults", locationResults)}

              {/*prints out all location options*/}
              <View style={styles.inputWrapper}>
                {/*search box*/}
                <TextInput
                  style={styles.textInput}
                  placeholder={this.printSelectedDestination()}
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
              </View>

              {isSearching && <ActivityIndicator size="large" color="blue" />}

              <ScrollView>
                {locationResults.map(el => (
                  //each location item
                  <LocationItem
                    //API props
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                    //custom props. calls the function on this file
                    setDestinationFromChild={this.setDestinationFromChild}
                  />
                ))}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }
        >
          <Picker.Item label="1 km" value="km1" />
          <Picker.Item label="3 km" value="km3" />
          <Picker.Item label="5 km" value="km5" />
        </Picker>
        <Button
          title="Next"
          onPress={() => {
            if (this.state.selectedDestination != null) {
              this.props.navigation.navigate("Tracker", {
                destinationName: this.state.selectedDestination.locationObject
                  .address_components[0].long_name,
                placeID: this.state.selectedDestination.locationObject.place_id
              });
            }
          }}
        />
      </View>
    );
  }
}

export default SelectDestination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16
  },
  inputWrapper: {
    marginTop: 80,
    flexDirection: "row"
  }
});
