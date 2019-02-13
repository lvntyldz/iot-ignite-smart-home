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

export default class Dashboard extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DashboardContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DashboardContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            summary: {},
            model: [],
            os: []
        }
    }

    componentWillMount = () => {
        const {context} = this.props;

        device.getDeviceSummary(context.token).then(summary => {
            this.setState({summary});
        });

        device.getDeviceModels(context.token).then(model => {
            this.setState({model});
        });

        device.getDeviceOsList(context.token).then(os => {
            this.setState({os});
        });
    }

    render() {
        const {context} = this.props;
        const {summary} = this.state;
        const {model} = this.state;
        const {os} = this.state;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Dashboard</Title>
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
                        <Text>Gateways</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>Online</Text>
                        </Left>
                        <Right>
                            <Badge success>
                                <Text>{summary.onlineDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Offline</Text>
                        </Left>
                        <Right>
                            <Badge warning>
                                <Text>{summary.offlineDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Total</Text>
                        </Left>
                        <Right>
                            <Badge primary>
                                <Text>{summary.totalDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text>User</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>Active</Text>
                        </Left>
                        <Right>
                            <Badge success>
                                <Text>{summary.activeUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Passive</Text>
                        </Left>
                        <Right>
                            <Badge warning>
                                <Text>{summary.totalUser - summary.activeUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Total</Text>
                        </Left>
                        <Right>
                            <Badge primary>
                                <Text>{summary.totalUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text>Devices Model</Text>
                    </Separator>

                    {model.map((v, k) => {
                        return (
                            <ListItem key={v.value}>
                                <Left>
                                    <Text>{v.value}</Text>
                                </Left>
                                <Right>
                                    <Badge primary>
                                        <Text>{v.count}</Text>
                                    </Badge>
                                </Right>
                            </ListItem>
                        );
                    })}

                    <Separator bordered>
                        <Text>Devices OS</Text>
                    </Separator>

                    {os.map((v, k) => {
                        return (
                            <ListItem key={v.value}>
                                <Left>
                                    <Text>{v.value}</Text>
                                </Left>
                                <Right>
                                    <Badge success>
                                        <Text>{v.count}</Text>
                                    </Badge>
                                </Right>
                            </ListItem>
                        );
                    })}

                    <ListItem last>
                        <Left/>
                        <Right/>
                    </ListItem>


                </Content>
            </Container>
        );//return
    }//render

}
