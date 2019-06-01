import React, {Component} from 'react';
import {Body, Container, Content, ListItem, Right, Text,} from 'native-base';
//custom
import {CtxConsumer} from '../../../boot/Container/index';
import * as device from '../../../lib/device/index';
import * as workingset from '../../../lib/workingset/index';

export default class DeviceList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceListContext goTo={this.props.goTo} context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceListContext extends Component {
    componentWillMount = () => {
        const {context} = this.props;

        context.showLoading();

        device.getList(this.props.context.token).then(devices => {
            this.setState({devices});
            context.hideLoading();
        });
    }
    handleClickDevice = (d) => {
        const {context} = this.props;
        workingset.empty(context.token).then(code => {
            context.setWorkingset(code);
            context.setDevice(d.code);
            context.setDeviceId(d.deviceId);
            context.setActivePage(this.props.goTo || "DeviceDetail");
        });

    }

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            devices: {}
        }
    }

    render() {
        const {devices} = this.state;

        if (!devices.content) {
            return null;
        }

        return (
            <Container>
                <Content>
                    {
                        devices.content.map((v) => {
                            return (
                                <ListItem key={v.code} button={true} onPress={(d) => this.handleClickDevice(v)}>
                                    <Body>
                                    <Text>{v.model}</Text>
                                    <Text note>{v.deviceId}</Text>
                                    </Body>
                                    <Right/>
                                </ListItem>
                            )
                        })
                    }
                </Content>
            </Container>
        );//return
    }//render
}