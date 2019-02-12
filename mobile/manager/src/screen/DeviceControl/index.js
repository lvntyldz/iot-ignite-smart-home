import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Separator, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

import * as workingset from 'MgrLib/workingset';

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
                id: null
            }
        }
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    componentWillMount = () => {

        const {context} = this.props;

        workingset.addDevice(context.token, context.workingset, context.device).then(count => {
            console.info("add device to workingset operation is success");
        });
    }

    handleStartRingClick = () => {

        const {context} = this.props;

        workingset.startRing(context.token, context.workingset).then(response => {
            console.info("ring started...");
        });
    }

    handleStopRingClick = () => {

        const {context} = this.props;

        workingset.ringstop(context.token, context.workingset).then(response => {
            console.info("ring stopped...");
        });
    }

    handleRestartClick = () => {

        const {context} = this.props;

        workingset.restartDevice(context.token, context.workingset).then(response => {
            console.info("device rebooted...");
        });
    }

    handleDetailClick = () => {


        this.setState({visible: true});

    }

    render() {
        const {device} = this.state;
        const {context} = this.props;

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

                    <Button block primary onPress={(d) => this.setModalVisible(true)}>
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
                        </Container>

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render
}