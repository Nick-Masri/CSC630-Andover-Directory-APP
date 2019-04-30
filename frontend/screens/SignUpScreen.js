import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native';


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
    width: 250,
    height: 320,
    alignItems: 'center',
    margin: 'auto',
    marginTop: 0,
  },
  appName: {
    fontSize: 60,
    color: '#FFF',
    marginBottom: 40,
    fontFamily: 'Roboto',
    marginTop: 0,
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
  formButton: {
    borderBottomWidth: 1,
    width: 350,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    padding: 5,
    fontSize: 20,
    color: '#FFF',
    borderColor: '#FFF',
  }
});
export default class FirstPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signUp = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Sign Up</Text>
          <TextInput
           style={styles.formButton}
           placeholder="Email Address" // TODO: Check on the frontend that this is a valid email address
           onChangeText={(text) => this.setState({email:text})}
         /> 
          <TextInput
           style={styles.formButton}
           placeholder="Password"
           onChangeText={(text) => this.setState({password:text})}
         />

         <Button
          title="SignUp"
          buttonStyle={styles.loginButton}
          onPress={this.signUp()}
        />

        </View>
      </View>
    );
  }
}
