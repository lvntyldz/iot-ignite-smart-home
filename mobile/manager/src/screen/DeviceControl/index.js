import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    ListItem,
    Right,
    Separator,
    Text,
    Title,
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

import * as workingset from 'MgrLib/workingset';
import * as device from "../../lib/device";

export default class DeviceControl extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceControlContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}//class

export class DeviceControlContext extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            rerender: false,
            device: {
                code: null,
                id: null,
                presence: {},
                location: {},
                battery: {},
                network: {
                    wifi: {},
                    bluetooth: {}
                },
                storage: {},
                osProfile: {},
                currentUser: {
                    profile: {
                        policy: {}
                    }
                },
                users: [],
                adminArea: {},
                activePolicy: {},
                links: []

            }
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
        context.showLoading();

        workingset.startRing(context.token, context.workingset).then(response => {
            console.info("ring started...");
            context.hideLoading();
        });
    }

    handleStopRingClick = () => {

        const {context} = this.props;
        context.showLoading();

        workingset.ringstop(context.token, context.workingset).then(response => {
            console.info("ring stopped...");
            context.hideLoading();
        });
    }

    handleRestartClick = () => {

        const {context} = this.props;
        context.showLoading();

        workingset.restartDevice(context.token, context.workingset).then(response => {
            console.info("device rebooted...");
            context.hideLoading();

        });
    }

    handleDetailClick = () => {

        const {context} = this.props;
        context.showLoading();

        device.getDetail(context.token, context.device).then(device => {
            this.setState({device, modalVisible: true});
            context.hideLoading();
        });
    }

    render() {
        const {context} = this.props;
        const {device} = this.state;
        const {osProfile} = device;

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

                    <Button block primary onPress={() => this.handleDetailClick()}>
                        <Text>Device Detail</Text>
                    </Button>

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        visible={this.state.modalVisible}
                    >
                        <Container>
                            <Header>
                                <Left/>
                                <Body>
                                <Title>Device Detail</Title>
                                </Body>
                                <Right>
                                    <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                                        <Text>X</Text>
                                    </Button>
                                </Right>
                            </Header>


                            <Content>
                                <Separator bordered>
                                    <Text>Gateway ID</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{device.deviceId}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Serial</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{osProfile.serial}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Model</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{osProfile.model}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>OS Version</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{osProfile.device}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Connection Status</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{device.presence.state}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Public Ip</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{device.presence.clientIp}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Local Ip</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>{device.network.wifi.ip}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Battery Info</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>%{device.battery.level}</Text>
                                    </Left>
                                </ListItem>

                                <Separator bordered>
                                    <Text>Last Presence Date</Text>
                                </Separator>
                                <ListItem>
                                    <Left>
                                        <Text>%{device.lastPresenceDate}</Text>
                                    </Left>
                                </ListItem>

                            </Content>


                        </Container>

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render
}