import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import Drawer from 'react-native-drawer'

import {CtxConsumer, CtxProvider} from 'MgrBoot/Container';
import Dashboard from 'MgrScreen/Dashboard';

import ActionLog from 'MgrScreen/ActionLog';
import ActionLogData from 'MgrScreen/ActionLog/Data';

import CreateSensorType from 'MgrScreen/SensorType/Create';
import ImportSensorType from 'MgrScreen/SensorType/Import';

import ImportModeSensorTypeConf from 'MgrScreen/Mode/SensorTypeConf/Import';

import CreateSensorDataConf from 'MgrScreen/SensorDataConf/Create';

import DeviceControl from 'MgrScreen/Device/Control';
import DeviceControlData from 'MgrScreen/Device/Control/Data';
import DeviceDetail from 'MgrScreen/Device/Detail';
import DeviceDetailData from 'MgrScreen/Device/Detail/Data';

import CreateCloudRule from 'MgrScreen/CreateCloudRule';
import CreateGatewayRule from 'MgrScreen/CreateGatewayRule';

import SendConfiguration from 'MgrScreen/SendConfiguration';
import SendConfigurationData from 'MgrScreen/SendConfiguration/Data';

import SendMessage from 'MgrScreen/SendMessage';
import SendMessageData from 'MgrScreen/SendMessage/Data';

import Login from '../screen/Login';
import * as db from 'MgrLib/db';
import SideBar from './SideBar';

//import DeviceDetail from "../screen/DeviceDetail";

class AppProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            device: null,
            deviceId: null,
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
            setDeviceId: (d) => {
                this.setState({deviceId: d});
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

        if (screenType === "ActionLog") {
            return <ActionLog/>;
        }

        if (screenType === "ActionLogData") {
            return <ActionLogData/>;
        }

        if (screenType === "DeviceControl") {
            return <DeviceControl/>;
        }

        if (screenType === "DeviceControlData") {
            return <DeviceControlData/>;
        }

        if (screenType === "DeviceDetail") {
            return <DeviceDetail/>;
        }

        if (screenType === "DeviceDetailData") {
            return <DeviceDetailData/>;
        }

        if (screenType === "CreateSensorType") {
            return <CreateSensorType/>;
        }

        if (screenType === "ImportSensorType") {
            return <ImportSensorType/>;
        }

        if (screenType === "ImportModeSensorTypeConf") {
            return <ImportModeSensorTypeConf/>;
        }

        if (screenType === "CreateSensorDataConf") {
            return <CreateSensorDataConf/>;
        }

        if (screenType === "CreateGatewayRule") {
            return <CreateGatewayRule/>;
        }

        if (screenType === "CreateCloudRule") {
            return <CreateCloudRule/>;
        }

        if (screenType === "SendConfiguration") {
            return <SendConfiguration/>;
        }

        if (screenType === "SendConfigurationData") {
            return <SendConfigurationData/>;
        }

        if (screenType === "SendMessage") {
            return <SendMessage/>;
        }

        if (screenType === "SendMessageData") {
            return <SendMessageData/>;
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
