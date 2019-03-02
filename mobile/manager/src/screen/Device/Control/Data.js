import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Right, Separator, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

import * as workingset from 'MgrLib/workingset';

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
        context.showLoading();

        workingset.startRing(context.token, context.workingset).then(response => {
            console.info("ring started...");
            context.hideLoading();
            context.showMessage("Start Ring Komutu Cihaza Başarıyla Gönderildi!").succes();
        });
    }
    handleStopRingClick = () => {

        const {context} = this.props;
        context.showLoading();

        workingset.ringstop(context.token, context.workingset).then(response => {
            console.info("ring stopped...");
            context.hideLoading();
            context.showMessage("Stop Ring Komutu Cihaza Başarıyla Gönderildi!").succes();
        });
    }
    handleRestartClick = () => {

        const {context} = this.props;
        context.showLoading();

        workingset.restartDevice(context.token, context.workingset).then(response => {
            console.info("device rebooted...");
            context.hideLoading();
            context.showMessage("Reboot Komutu Cihaza Başarıyla Gönderildi!").succes();
        });
    }

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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {context} = this.props;
        const {device} = this.state;

        if (!device) {
            return null;
        }

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Device Control</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content style={{paddingLeft: 10, paddingRight: 10}}>

                    <Button block danger onPress={() => this.handleStopRingClick()}>
                        <Text>Stop Ring</Text>
                    </Button>

                    <Separator/>

                    <Button block success onPress={() => this.handleStartRingClick()}>
                        <Text>Start Ring</Text>
                    </Button>

                    <Separator/>

                    <Button block warning onPress={() => this.handleRestartClick()}>
                        <Text>Restart Device</Text>
                    </Button>

                    <Separator/>

                </Content>
            </Container>
        );//return
    }//render
}