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

  constructor(props){
    super(props);
    this.state ={
      students: [],
      page: 1,
      loading: true,
      search: '',
      searchStatus: false,
    }
  }

  async componentDidMount(){
    try{
      this.makeRemoteRequest();
    } catch(err) {
      console.log(err)
    }
  }

  async makeRemoteRequest(){
    const page = this.state.page;
    const studentsApiCall = await fetch('https://csc630-project-2.herokuapp.com/people?page=' + page);
    const studentJson = await studentsApiCall.json();
    if (studentJson.data.length !== 0){
      this.setState({
        students: this.state.students.concat(studentJson.data),
        loading: false,
      })
    }
  }

  async makeSearchRequest(){
    const searchApiCall = await fetch('https://csc630-project-2.herokuapp.com/people?search=' + this.state.search);
    const searchJson = await searchApiCall.json();
    if (searchJson.data.length !== 0){
      this.setState({
        students: searchJson.data,
      })
    }
  }

  clearSearch = () => {
    this.setState({
      search: '',
      searchStatus: false,
      students: [],
      page: 1,
    }, () => {
      this.makeRemoteRequest();
    })
  }

  updateSearch = (search) => {
    this.setState({
      search: search,
      searchStatus: true,
    }, () => {
      this.makeSearchRequest();
    });
  };

  handleLoadMore = () => {
    if (!this.state.searchStatus){
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.makeRemoteRequest();
      })
    }
  }

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search students"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          onCancel={() => this.clearSearch()}
          />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.students}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.display_name}
          onEndReached={this.handleLoadMore}
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
