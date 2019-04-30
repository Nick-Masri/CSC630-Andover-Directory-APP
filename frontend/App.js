import HomeScreen from './screens/FirstPage'
import SearchScreen from './screens/Search'
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

const AppNavigator = createStackNavigator(
  { Home: HomeScreen,
    Search: SearchScreen,

  },
  {initialRouteName: "Home"}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
