import FirstPage from './screens/FirstPage'
import HomeScreen from './screens/Search'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'


import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

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
  renderItem(data) {
    return <View style={styles.listItem}>
            <Text>{data.item.display_name}</Text>
            <Text>Cluster: {data.item.cluster}</Text>
            <Text>Dorm: {data.item.grade}</Text>
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
