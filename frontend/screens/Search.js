import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Search students"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          />
        <View style={styles.container}>
          <Text>Search</Text>
        </View>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});