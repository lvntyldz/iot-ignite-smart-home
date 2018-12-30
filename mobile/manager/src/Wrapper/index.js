import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import FormLogin from 'MgrScreen/FormLogin';

const AppContext = React.createContext();

class AppProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      reset: () => {
        this.setState({value: 0});
      },
      increase: () => {
        this.setState({value: this.state.value + 1});
      },
      decrease: () => {
        this.setState({value: this.state.value - 1});
      }
    } //state
  } //constructor

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    ); //return

  } //render

} //AppProvider

export default class Wrapper extends Component {

  render() {

    return (
      <AppProvider>
        <View style={[s.container, {borderColor: 'black',top: 20}]}>

          <AppContext.Consumer>
            {(context) => {
              return (
                <View style={{flex: 1,flexDirection: 'column', backgroundColor:'#c4c4c4'}}>
                <FormLogin />
                </View>
              );//return
            }//context
            }
          </AppContext.Consumer>

        </View>
      </AppProvider>
    ); //return

  } //render

} //Wrapper

const s = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    //borderWidth: 1
  }
});
