import React, {Component} from 'react';

import {
    Body,
    Button,
    Container,
    Content,
    Footer,
    Header,
    Icon,
    Left,
    ListItem,
    Right,
    Subtitle,
    Text,
    Title
} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';

export default class SideBar extends Component {

    render() {

        const activeStyle = {backgroundColor: '#F1F1F1'};

        return (
            <CtxConsumer>
                {(context) => {
                    return (
                        <Container>
                            <Header>
                                <Left>
                                    <Button onPress={() => context.hideSideBar()} iconLeft light>
                                        <Icon name='arrow-back'/>
                                    </Button>
                                </Left>
                                <Body>
                                <Title>Menu</Title>
                                <Subtitle>...</Subtitle>
                                </Body>
                                <Right/>
                            </Header>

                            <Content>

                                <ListItem icon style={context.screenType === "Dashboard" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("Dashboard")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="pie"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Dashboard</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon style={context.screenType === "ActionLog" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("ActionLog")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="cog"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Action Logs</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon style={context.screenType === "SendMessage" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("SendMessage")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="cog"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>SendMessage</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon style={context.screenType === "SendConfiguration" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("SendConfiguration")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="cog"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Send Conf(Mode/Policy)</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon
                                          style={context.screenType === "DeviceDetail" || context.screenType === "DeviceDetailData" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("DeviceDetail")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="phone-portrait"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>DeviceDetail</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon
                                          style={context.screenType === "DeviceControl" || context.screenType === "DeviceControlData" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("DeviceControl")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="phone-portrait"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>DeviceControl</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon style={context.screenType === "CreateSensorType" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("CreateSensorType")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="wifi"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>CreateSensorType</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon style={context.screenType === "ImportSensorType" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("ImportSensorType")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="wifi"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>ImportSensorType</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon style={context.screenType === "CreateCloudRule" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("CreateCloudRule")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="cog"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>CreateCloudRule</Text>
                                    </Body>
                                </ListItem>


                                <ListItem icon style={context.screenType === "CreateGatewayRule" ? activeStyle : {}}>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("CreateGatewayRule")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="cog"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>CreateGatewayRule</Text>
                                    </Body>
                                </ListItem>

                            </Content>

                            <Footer style={{bottom: 10}}>
                                <Left>
                                    <Button iconLeft transparent danger onPress={() => context.logut()}>
                                        <Icon active name="ios-log-out"/>
                                        <Text>Logout</Text>
                                    </Button>
                                </Left>
                                <Right/>
                            </Footer>


                        </Container>
                    )
                }

                }
            </CtxConsumer>
        );
    }
}