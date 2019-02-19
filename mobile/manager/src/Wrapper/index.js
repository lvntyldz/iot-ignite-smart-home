import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import Drawer from 'react-native-drawer'
import {Spinner} from 'native-base';

import {CtxConsumer, CtxProvider} from 'MgrBoot/Container';
import DeviceControl from 'MgrScreen/DeviceControl';
import DeviceList from 'MgrScreen/DeviceList';
import SensorType from 'MgrScreen/SensorType';
import Dashboard from 'MgrScreen/Dashboard';
import Login from '../screen/Login';
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
            loading: false,
            toast: {
                active: true,
                message: null,
                bgColor: null
            },
            showMessage: (msg) => {
                setTimeout(() => {
                    this.setState({toast: {active: false, message: null, bgColor: null}});
                }, 3000);

                return {
                    warn: () => {
                        this.setState({toast: {active: true, message: msg, bgColor: '#FDBD2C'}});
                    },
                    info: () => {
                        this.setState({toast: {active: true, message: msg, bgColor: '#1787FB'}});
                    },
                    succes: () => {
                        this.setState({toast: {active: true, message: msg, bgColor: '#17A346'}});
                    },
                    err: () => {
                        this.setState({toast: {active: true, message: msg, bgColor: '#E43C45'}});
                    }
                }
            },
            showLoading: () => {
                this.setState({loading: true});
            },
            hideLoading: () => {
                this.setState({loading: false});
            },
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

    loadMessageBar = (toast) => {

        if (toast.active === true) {
            return (
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: toast.bgColor,
                    zIndex: 11,
                    height: 50
                }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFF'}}>{toast.message}</Text>
                </View>
            )
        }

        return null;
    }
    loadActivityIndicator = (show, msg) => {

        if (show === true) {
            return (
                <ActivityIndicator size="large" color="#000" style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.7)',
                    zIndex: 10,
                }}/>
            )
        }

        return null;
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
                                    {this.loadMessageBar(context.toast)}
                                    {this.loadActivityIndicator(context.loading)}
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
