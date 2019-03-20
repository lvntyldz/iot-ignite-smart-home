import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {Button, Container, Content, Separator, Text,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';

import * as workingset from 'MgrLib/workingset';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

export default class DeviceControlData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceControlDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}//class

export class DeviceControlDataContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            rerender: false,
            device: {
                code: null,
                id: null,
            }
        }
    }

    componentWillMount = () => {

        const {context} = this.props;
        context.showLoading();

        workingset.addDevice(context.token, context.workingset, context.device).then(count => {
            console.info("add device to workingset operation is success");
            context.hideLoading();
        });
    }
    handleStartRingClick = () => {

        const {context} = this.props;
        const {locale} = context;
        context.showLoading();

        workingset.startRing(context.token, context.workingset).then(response => {
            console.info("ring started...");
            context.hideLoading();
            context.showMessage(lang(locale).getLabel("screen.device.message.startRingSuccess")).succes();
        });
    }
    handleStopRingClick = () => {

        const {context} = this.props;
        const {locale} = context;
        context.showLoading();

        workingset.ringstop(context.token, context.workingset).then(response => {
            console.info("ring stopped...");
            context.hideLoading();
            context.showMessage(lang(locale).getLabel("screen.device.message.stopRingSuccess")).succes();
        });
    }
    handleRestartClick = () => {

        const {context} = this.props;
        const {locale} = context;
        context.showLoading();

        workingset.restartDevice(context.token, context.workingset).then(response => {
            console.info("device rebooted...");
            context.hideLoading();
            context.showMessage(lang(locale).getLabel("screen.device.message.rebootSuccess")).succes();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {context} = this.props;
        const {locale} = context;
        const {device} = this.state;

        if (!device) {
            return null;
        }

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.device.controlTitle")}/>

                <Content style={{paddingLeft: 10, paddingRight: 10}}>

                    <Button block danger onPress={() => this.handleStopRingClick()}>
                        <Text>{lang(locale).getLabel("screen.device.stopRingBtn")}</Text>
                    </Button>

                    <Separator/>

                    <Button block success onPress={() => this.handleStartRingClick()}>
                        <Text>{lang(locale).getLabel("screen.device.startRingBtn")}</Text>
                    </Button>

                    <Separator/>

                    <Button block warning onPress={() => this.handleRestartClick()}>
                        <Text>{lang(locale).getLabel("screen.device.restart")}</Text>
                    </Button>

                    <Separator/>

                </Content>
            </Container>
        );//return
    }//render
}