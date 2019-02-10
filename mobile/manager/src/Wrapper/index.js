import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Drawer from 'react-native-drawer'

import {CtxConsumer, CtxProvider} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/DeviceList';
import Dashboard from 'MgrScreen/Dashboard';
import FormLogin from 'MgrScreen/FormLogin';
import ListHeader from 'MgrScreen/ListHeader';
import * as db from 'MgrLib/db';
import SideBar from './SideBar';

class AppProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            screenType: "FormLogin",
            sideBarOpen: false,
            setToken: (d) => {
                this.setState({token: d});
            },
            setActivePage: (d) => {
                this.setState({screenType: d});
            },
            showSideBar: () => {
                this.setState({sideBarOpen: true});
            },
            hideSideBar: () => {
                this.setState({sideBarOpen: false});
            },
            logut: () => {
                this.setState({screenType: "FormLogin", token: null, sideBarOpen: false});
            },
            changeScreenByType: (screenType) => {

                if (!screenType) {
                    screenType = "FormLogin";
                }

                this.setState({screenType: screenType, sideBarOpen: false});
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

    loadScreenByType = (screenType) => {

        if (screenType === "ListHeader") {
            return <ListHeader/>;
        }

        if (screenType === "Dashboard") {
            return <Dashboard/>;
        }

        if (screenType === "DeviceList") {
            return <DeviceList/>;
        }

        return <FormLogin/>;
    }

    render() {

        return (
            <AppProvider>
                <View style={[s.container, {borderColor: 'black', top: 20}]}>

                    <CtxConsumer>
                        {(context) => {
                            return (
                                <Drawer
                                    openDrawerOffset={0.2}
                                    open={context.sideBarOpen}
                                    content={<SideBar
                                        changeScreenByType={(d) => this.changeScreenByType(d)}/>}
                                >
                                    <Text> Token : {context.token}</Text>
                                    {this.loadScreenByType(context.screenType)}
                                </Drawer>
                            )//return

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
