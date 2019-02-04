import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { CtxProvider, CtxConsumer } from 'MgrBoot/Container';
import FormLogin from 'MgrScreen/FormLogin';
import ListHeader from 'MgrScreen/ListHeader';
import * as db from 'MgrLib/db';

class AppProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      token:null,
      currenPage:"FormLogin",
      setToken: (d) => {
        this.setState({token: d});
      },
      setActivePage: (d) => {
        this.setState({currenPage: d});
      },
      increase: () => {
        this.setState({value: this.state.value + 1});
      },
      decrease: () => {
        this.setState({value: this.state.value - 1});
      }
    } //state

    //create DB and Tables...
    db.createScripts();
  } //constructor

  render() {
    return (
      <CtxProvider value={this.state}>
        {this.props.children}
      </CtxProvider>
    ); //return

  } //render

} //AppProvider

export default class Wrapper extends Component {

  loadScreenBy(currenPage){

    if(currenPage==="FormLogin"){
      return <FormLogin />
    }
    if(currenPage==="ListHeader"){
      return <ListHeader />
    }

    return <FormLogin />
  }

  render() {

    return (
      <AppProvider>
        <View style={[s.container, {borderColor: 'black',top: 20}]}>

          <CtxConsumer>
            {(context) => {
              return (
                <View style={{flex: 1,flexDirection: 'column', backgroundColor:'#c4c4c4'}}>
                <Text> Token  : {context.token}</Text>
                {this.loadScreenBy(context.currenPage)}
                </View>
              );//return
            }//context
            }
          </CtxConsumer>

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
