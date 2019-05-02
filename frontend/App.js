import FirstPage from './screens/FirstPage'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SearchScreen from './screens/SearchScreen'
import FiltersScreen from './screens/FiltersScreen'

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
  Home : {
    screen: FirstPage,
  },
  LoginScreen : {
    screen: LoginScreen,
  },
  SignUpScreen : {
    screen: SignUpScreen,
  },
  Search : {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: null,
    })
  },
  Filters : {
    screen: FiltersScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: null,
    })
  }},
  {initialRouteName: "Search"}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return(
      <AppContainer />
    )
  }
}
