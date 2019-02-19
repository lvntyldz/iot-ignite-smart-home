import React, {Component} from 'react';
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
import * as device from "../../../lib/device";


export default class DeviceDetailData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceDetailDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceDetailDataContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    componentDidMount = () => {
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
                    <Title>Device Detail Data</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
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
        );//return
    }//render

}
