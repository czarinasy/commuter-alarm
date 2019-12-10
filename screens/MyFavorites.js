import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container
} from "native-base";

class MyFavorites extends React.Component {
  static navigationOptions={
    drawerLabel: "My Favorites"
  };
  render() {
    return (
    <Container>
    <Header style={styles.header}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={ () => this.props.navigation.navigate("HomeScreen")}>
        <Icon name="ios-arrow-round-back"/>
        </Button>
      </Left>

      <Body style={{ flex: 1 }}>
        <Text style={styles.text}>Favorites</Text>
      </Body>

      <Right style={{ flex: 1 }}>
      </Right>
    </Header>
      <View style={styles.container}>
      </View>
      </Container>
    );
  }
}

export default MyFavorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    alignSelf:"center",
    color: "white",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: "bold"
  },
    header: {
      paddingRight: 15,
      paddingLeft: 15,
      height: 70,
      //marginTop: StatusBar.currentHeight,
      backgroundColor: "lightskyblue",
      paddingTop: 14
  }
});
