import React, { Component } from 'react';
import { Button } from 'react-native-elements';
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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => {
      console.log(response);

      // TODO: Add in redirect based on authentication
    });
  }


  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Directory Manager</Text>
          <Image source={require('./assets/andoverLogo.png')} style={styles.andoverLogo} />
          <TextInput
           style={{height: 40}}
           placeholder="Email Address" // TODO: Check on the frontend that this is a valid email address
           onChangeText={(text) => this.setState({email})}
         />
          <TextInput
           style={{height: 40}}
           placeholder="Password"
           onChangeText={(text) => this.setState({password})}
         />

         <Button
          title="Login"
          onPress={this.login()}
          buttonStyle={styles.loginButton}
        />
        </View>
      </View>
    );
  }
}
