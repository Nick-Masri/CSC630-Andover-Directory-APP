import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/Search'
import LoginScreen from './screens/LoginScreen'
import SignUp from './screens/SignUp'
import FirstPage from './screens/FirstPage'

import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';


const AppStack = createStackNavigator({ Home: FirstPage});
const AuthStack = createStackNavigator({ SignIn: LoginScreen });


const AppNavigator = createStackNavigator(
  { Home: HomeScreen,
    Search: SearchScreen,
    Login: LoginScreen,
    SignUp: SignUp,
    FirstPage: FirstPage,
  },
  {
    initialRouteName: "FirstPage"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
