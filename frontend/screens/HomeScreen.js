import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
//directory.json should be in assets
var users = require('../assets/testDirectory.json')

export default class HomeScreen extends React.Component {

  renderItem(data) {
    return <View style={styles.listItem}>
            <Text>{data.item.display_name}</Text>
            <Text>{data.item.cluster}</Text>
            <Text>{data.item.grade}</Text>
          </View>
  }

  
  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Search"
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={users}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.display_name}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignSelf: 'stretch',
  },
  listItemTextMain: {
    fontWeight: 'bold',
  },
  list:{
    flexGrow: 1,
    justifyContent: 'center',
  },
  displayText: {
    padding: 8,
    textAlign: 'center',
  }
});