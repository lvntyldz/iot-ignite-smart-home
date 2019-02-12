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
import * as device from 'MgrLib/device';
import * as workingset from 'MgrLib/workingset';

export default class DeviceList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceListContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceListContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            devices: {}
        }
    }

    componentWillMount = () => {

        device.getList(this.props.context.token).then(devices => {
            this.setState({devices});
        });
    }

    handleClickDevice = (d) => {
        const {context} = this.props;
        workingset.empty(context.token).then(code => {
            context.setWorkingset(code);
            context.setDevice(d);
            context.setActivePage("DeviceControl");
        });

    }

    render() {
        const {devices} = this.state;
        const {context} = this.props;

        if (!devices.content) {
            return null;
        }

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>DeviceList</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>

                    {
                        devices.content.map((v) => {
                            return (
                                <ListItem key={v.code} button={true} onPress={(d) => this.handleClickDevice(v.code)}>
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