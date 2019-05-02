import React from 'react';
import { TextInput, StyleSheet, Button, Text, View, FlatList, Picker } from 'react-native';
import { SearchBar, } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select';

export default class FiltersScreen extends React.Component {
    constructor(props){
      super(props);
      this.inputRefs = {
        firstTextInput: null,
        cluster: null,
        grade: null,
        lastTextInput: null,
      };
      this.state={
        cluster: null,
        grade: '',
        dorm: '',
      }
    }
    saveFilters = () => {
      this.props.navigation.push('Search', {
        dorm: this.state.dorm,
        cluster: this.state.cluster,
        grade: this.state.grade,
      })
      this.props.navigation.navigate('Search')
    }
    render() {
      const clusters = [{
          label: 'Abbot',
          value: 'ABB',
        },
        {
          label: 'Flagstaff',
          value: 'FLG',
        },
        {
          label: 'Pine Knoll',
          value: 'PKN',
        },
      ];
      const grades = [
        {
          label: 'Junior',
          value: 'Junior',
        },
        {
          label: 'Lower',
          value: 'Lower',
        },
        {
          label: 'Upper',
          value: 'Upper',
        },
        {
          label: 'Senior',
          value: 'Senior',
        },
      ]
      const clusterInit = {
        label: 'Select a cluster...',
        value: null,
        color: '#9EA0A4',
      };
      const gradeInit = {
        label: 'Select a grade...',
        value: null,
        color: '#9EA0A4',
      };
      return (
        <View>
          <TextInput
            placeholder="Dorm"
            onChangeText={(text) => this.setState({dorm: text})}
            />
          <RNPickerSelect
            placeholder={clusterInit}
            items={clusters}
            onValueChange={value => {
              this.setState({
                cluster: value,
              });
            }}
            value={this.state.cluster}
          />
          <RNPickerSelect
            placeholder={gradeInit}
            items={grades}
            onValueChange={value => {
              this.setState({
                grade: value,
              });
            }}
            value={this.state.grade}
          />
          <Button
            title="Save"
            onPress={() => 
              this.props.navigation.push('Search', {
                dorm: this.state.dorm,
                cluster: this.state.cluster,
                grade: this.state.grade,
              })}
          />
        </View>
      );
    }
  }