import React, {Component} from 'react';
import {
    Badge,
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

export default class DeviceDetail extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceDetailContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}//class

export class DeviceDetailContext extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            device: {
                code: null,
                id: null
            }
        }
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
                    <Title>DeviceDetail</Title>
                    </Body>
                    <Left/>
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

                </Content>
            </Container>
        );//return
    }//render
}