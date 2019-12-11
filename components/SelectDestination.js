import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Icon, Button, Header } from "native-base";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "./LocationItem";
import { GOOGLE_API_KEY } from "../API_KEYS";

const SelectDestination = props => {
  const [selectedDestination, setSelectedDestination] = useState({});
  const [hasSelected, setHasSelected] = useState(false);

  const selectDestinationHandler = async location => {
    if (location) {
      console.log(location.address_components[0].long_name);
      setSelectedDestination(location);
      if (selectedDestination) {
        setHasSelected(true);
        console.log(
          "\n\n-------------------[SELECT DESTINATION] Selected Destination -------------------"
        );
        console.log(selectedDestination.address_components[0].long_name);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/*GOOGLE PLACES API*/}
      <GoogleAutoComplete
        apiKey={GOOGLE_API_KEY()}
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
            {/*console.log("locationResults", locationResults)*/}
            {/*prints out all location options*/}
            <View style={styles.inputWrapper}>
              {/*search box*/}
              <View style={styles.search}>
                <Icon name="ios-map" style={styles.map} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Search..."
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
              </View>
            </View>
            <Button
              title="Select"
              style={styles.button}
              onPress={() => props.onSelect(selectedDestination)}
            >
              <Text style={styles.txt}>Confirm</Text>
            </Button>

            {isSearching && (
              <ActivityIndicator
                size="large"
                color="lightsteelblue"
                style={{ marginTop: 10 }}
              />
            )}
            <ScrollView>
              {locationResults.map(el => (
                //each location item
                <LocationItem
                  //API props
                  {...el}
                  key={el.id}
                  fetchDetails={fetchDetails}
                  //custom props. calls the function on this file
                  onSetLocation={selectDestinationHandler}
                />
              ))}
            </ScrollView>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    </View>
  );
};

export default SelectDestination;

const styles = StyleSheet.create({
  button: {
    marginLeft: 5,
    alignSelf: "center",
    backgroundColor: "lightskyblue",
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    height: 35
  },
  txt: {
    color: "white",
    fontSize: 15
  },
  status: {
    marginBottom: 10,
    color: "lightsteelblue"
  },
  map: {
    color: "lightskyblue"
  },
  search: {
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width * 0.9
  },
  text: {
    fontSize: 30
  },
  textInput: {
    height: 40,
    width: 296,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderColor: "lightgrey",
    color: "lightsteelblue"
  },
  inputWrapper: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center"
  }
});