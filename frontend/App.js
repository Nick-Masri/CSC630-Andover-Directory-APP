import FirstPage from './screens/FirstPage'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    Home: FirstPage,
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
    HomeScreen: HomeScreen
  },
  {initialRouteName: "Home"}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return(
      <AppContainer />
    )
  }
}
