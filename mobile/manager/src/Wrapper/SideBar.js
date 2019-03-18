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

                                <ListItem button={true} onPress={() => context.changeScreenByType("Dashboard")} icon
                                          style={context.screenType === "Dashboard" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="pie"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Dashboard</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("ActionLog")} icon
                                          style={context.screenType === "ActionLog" || context.screenType === "ActionLogData" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="ios-analytics"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Action Logs</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("SendMessage")} icon
                                          style={context.screenType === "SendMessage" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="ios-mail"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Send Message</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("SendProfile")}
                                          icon
                                          style={context.screenType === "SendProfile" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="ios-construct"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Send Conf(Mode/Policy)</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("DeviceDetail")} icon
                                          style={context.screenType === "DeviceDetail" || context.screenType === "DeviceDetailData" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="md-search"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Device Detail</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("DeviceControl")} icon
                                          style={context.screenType === "DeviceControl" || context.screenType === "DeviceControlData" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="phone-portrait"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Device Control</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("CreateSensorType")}
                                          icon
                                          style={context.screenType === "CreateSensorType" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="ios-thermometer"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Create Sensor Type</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("ImportSensorType")}
                                          icon
                                          style={context.screenType === "ImportSensorType" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="wifi"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Import Sensor Type</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("CreateCloudRule")}
                                          icon
                                          style={context.screenType === "CreateCloudRule" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="md-alarm"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Create Cloud Rule</Text>
                                    </Body>
                                </ListItem>

                                {/*
                                <ListItem button={true} onPress={() => context.changeScreenByType("CreateGatewayRule")}
                                icon
                                style={context.screenType === "CreateGatewayRule" ? activeStyle : {}}>
                                <Left>
                                <Button style={{backgroundColor: "#007AFF"}}>
                                <Icon active name="md-notifications-outline"/>
                                </Button>
                                </Left>
                                <Body>
                                <Text>Create Gateway Rule</Text>
                                </Body>
                                </ListItem>
                                */}

                                <ListItem button={true}
                                          onPress={() => context.changeScreenByType("CreateSensorDataConf")}
                                          icon
                                          style={context.screenType === "CreateSensorDataConf" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="md-settings"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Create Sensor Data Conf</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true}
                                          onPress={() => context.changeScreenByType("ImportModeSensorTypeConf")}
                                          icon
                                          style={context.screenType === "ImportModeSensorTypeConf" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#60B760"}}>
                                            <Icon active name="md-planet"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Import Mode Sensor Type Conf</Text>
                                    </Body>
                                </ListItem>

                                {/*
                                <ListItem button={true}
                                onPress={() => context.changeScreenByType("ImportModeSensorInventoryConf")}
                                icon
                                style={context.screenType === "ImportModeSensorInventoryConf" ? activeStyle : {}}>
                                <Left>
                                <Button style={{backgroundColor: "#007AFF"}}>
                                <Icon active name="wifi"/>
                                </Button>
                                </Left>
                                <Body>
                                <Text>Import Mode Sensor Inventory Conf</Text>
                                </Body>
                                </ListItem>
                                */}

                                {/*
                                <ListItem button={true} onPress={() => context.changeScreenByType("Reports1")} icon
                                style={context.screenType === "Reports1" ? activeStyle : {}}>
                                <Left>
                                <Button style={{backgroundColor: "#c4c"}}>
                                <Icon active name="ios-mail"/>
                                </Button>
                                </Left>
                                <Body>
                                <Text>Reports1</Text>
                                </Body>
                                </ListItem>
                                */}

                                <ListItem button={true} onPress={() => context.changeScreenByType("YearlyGraph")} icon
                                          style={context.screenType === "YearlyGraph" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#c4c"}}>
                                            <Icon active name="ios-mail"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>YearlyGraph</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("MonthlyGraph")} icon
                                          style={context.screenType === "MonthlyGraph" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#c4c"}}>
                                            <Icon active name="ios-mail"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>MonthlyGraph</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("WeeklyGraph")} icon
                                          style={context.screenType === "WeeklyGraph" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#c4c"}}>
                                            <Icon active name="ios-mail"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>WeeklyGraph</Text>
                                    </Body>
                                </ListItem>

                                <ListItem button={true} onPress={() => context.changeScreenByType("DailyGraph")} icon
                                          style={context.screenType === "DailyGraph" ? activeStyle : {}}>
                                    <Left>
                                        <Button style={{backgroundColor: "#c4c"}}>
                                            <Icon active name="ios-mail"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>DailyGraph</Text>
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