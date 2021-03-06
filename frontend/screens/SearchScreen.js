import React from 'react';
import { StyleSheet, Button, Text, View, FlatList, } from 'react-native';
import { SearchBar, } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  //render items for the list of items for FlatList
  renderItem(data) {
    return <View style={styles.listItem}>
            <Text>{data.item.display_name}</Text>
            <Text>Grade: {data.item.grade}</Text>
            <Text>Cluster: {data.item.cluster}</Text>
            <Text>Dorm: {data.item.dorm}</Text>
            <Text>From: {data.item.from}</Text>
            <Text>Entered: {data.item.entered}</Text>
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
  //make remote request to fetch json data and implement that in the state
  async makeRemoteRequest(){
    filters = await this.getFilters()

    const page = this.state.page;
    const studentsApiCall = await fetch('https://csc630-project-2.herokuapp.com/people?' + filters + '&page=' + page);
    const studentJson = await studentsApiCall.json();
    if (studentJson.data.length !== 0){
      if (this.state.search.length > 0){
        this.setState({
          students: studentJson.data,
        })
      }else {
        this.setState({
          students: this.state.students.concat(studentJson.data),
          loading: false,
        })
      }
    }
  }
  //creates a string of all filters from the filter page
  getFilters = () => {
    const dorm = this.props.navigation.getParam('dorm')
    const grade = this.props.navigation.getParam('grade')
    const cluster = this.props.navigation.getParam('cluster')
    const search = this.state.search
    var filters = ''
    if(dorm !== undefined && dorm !== null && dorm !== ''){
      filters = '&dorms=' + dorm
    }
    if(grade !== undefined && grade !== null && grade !== ''){
      filters = filters + '&grades=' + grade
    }
    if(cluster !== undefined && cluster !== null && cluster !== ''){
      filters = filters + '&clusters=' + cluster
    }
    if(search !== ''){
      filters = filters + '&search=' + search
    }
    return filters
  }
  //reset all parameters used for search
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
  //updates the search state
  updateSearch = (search) => {
    this.setState({ 
      search: search,
      searchStatus: true,
    }, () => {
      this.makeRemoteRequest();
    });
  };
  //handles infinite scroll
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
        <Button
          title="Filters"
          onPress={() => this.props.navigation.navigate('Filters')}
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