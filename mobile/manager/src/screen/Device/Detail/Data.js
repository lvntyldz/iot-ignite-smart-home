import React, {Component} from 'react';
import {Container, Content, Left, ListItem, Separator, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as device from "MgrLib/device";
import SideBarNav from 'MgrComponent/SideBarNav';


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
            device: this.getDefaultDeviceState()
        }
    }

    getDefaultDeviceState = () => {
        return {
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
        let {device} = this.state;
        let {osProfile} = device;

        if (!device || !osProfile) {
            device = this.getDefaultDeviceState();
            osProfile = device.osProfile;
        }

        return (
            <Container>

                <SideBarNav pageTitle="Device Detail Data"/>

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
