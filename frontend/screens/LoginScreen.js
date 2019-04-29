import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';


const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#00319C',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  widthContainer: {
    width: 350,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  andoverLogo: {
    width: 350,
    height: 250,
    resizeMode: "stretch",
    alignItems: 'center',
    margin: 'auto',
  },
  appName: {
    fontSize: 72,
    color: '#FFF',
    marginBottom: 50,
    fontFamily: 'Roboto',
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    padding: 35,
    borderRadius: 18,
    marginTop: 50,
    width: 350,
    borderWidth: 2,
  },
  loginButton: {
    borderColor: '#FFF',
    marginTop: 50,
  },
  signUpButton: {
    marginBottom: 50,
    backgroundColor: '#BBE6FE',
    borderColor: '#BBE6FE',
  },
  buttonText: {
    fontSize: 28,
    color: '#FFF',
  },
});

export default class FirstPage extends Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          
        </View>
      </View>
    );
  }
}
