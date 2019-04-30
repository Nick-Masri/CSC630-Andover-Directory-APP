import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';


const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#1A46A6',
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
    width: 320,
    height: 320,
    resizeMode: "stretch",
    alignItems: 'center',
    margin: 'auto',
  },
  appName: {
    fontSize: 60,
    color: '#FFF',
    marginBottom: 40,
    fontFamily: 'Roboto',
    marginTop: 65,
    textAlign: 'center'
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
  },
  signUpButton: {
    marginBottom: 50,
    backgroundColor: '#97E1E6',
    borderColor: '#97E1E6',
  },
  buttonText: {
    fontSize: 28,
    color: '#FFF',
  },
});

export default class FirstPage extends Component {

  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Directory Manager</Text>
          <Image source={require('./../assets/andoverSeal.png')} style={styles.andoverLogo} />
          <TouchableOpacity
            style={[styles.loginButton, styles.button]}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.signUpButton, styles.button]}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
