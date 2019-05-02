import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import SearchScreen from './screens/SearchScreen'
import FiltersScreen from './screens/FiltersScreen'





const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Filters: FiltersScreen,
  },
  {
    initialRouteName: "Search",
  }
);

export default createAppContainer(AppNavigator);