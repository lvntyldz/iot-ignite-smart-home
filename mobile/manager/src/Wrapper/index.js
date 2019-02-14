import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Drawer from 'react-native-drawer'

import {CtxConsumer, CtxProvider} from 'MgrBoot/Container';
import DeviceControl from 'MgrScreen/DeviceControl';
import DeviceList from 'MgrScreen/DeviceList';
import SensorType from 'MgrScreen/SensorType';
import Dashboard from 'MgrScreen/Dashboard';
import Login from '../screen/Login';
import ListHeader from 'MgrScreen/ListHeader';
import * as db from 'MgrLib/db';
import SideBar from './SideBar';

class AppProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            device: null,
            workingset: null,
            token: null,
            screenType: "Login",
            sideBarOpen: false,
            setToken: (d) => {
                this.setState({token: d});
            },
            setDevice: (d) => {
                this.setState({device: d});
            },
            setWorkingset: (d) => {
                this.setState({workingset: d});
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
                this.setState({screenType: "Login", token: null, sideBarOpen: false});
            },
            changeScreenByType: (screenType) => {

                if (!screenType) {
                    screenType = "Login";
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

        if (screenType === "SensorType") {
            return <SensorType/>;
        }

        if (screenType === "DeviceControl") {
            return <DeviceControl/>;
        }

        return <Login/>;
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
