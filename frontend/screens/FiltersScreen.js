import React from 'react';
import { TextInput, StyleSheet, Button, View, } from 'react-native';
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
        {
          label: 'West Quad North',
          value: 'WQN',
        },
        {
          label: 'West Quad South',
          value: 'WQS',
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
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Dorm"
              onChangeText={(text) => this.setState({dorm: text})}
              />
          </View>
          <RNPickerSelect
            style={pickerSelectStyles}
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
            style={pickerSelectStyles}
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    margin: 15,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    margin: 15,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
  },
});

const styles = StyleSheet.create({
  inputText: {
    padding: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  textInputContainer: {
    margin: 15,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  }
});