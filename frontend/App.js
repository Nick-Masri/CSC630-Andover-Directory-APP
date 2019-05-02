import FirstPage from './screens/FirstPage'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SearchScreen from './screens/SearchScreen'
import FiltersScreen from './screens/FiltersScreen'

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
    Home: FirstPage,
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
    Search: SearchScreen,
    Filters: FiltersScreen,
  },
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
