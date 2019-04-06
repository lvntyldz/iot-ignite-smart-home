import React, {Component} from 'react';

import {
    Badge,
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
import {lang} from 'MgrLocale';
import {EASY_SETUP, SMART_USAGE} from 'MgrEnum/Role';

const activeStyle = {backgroundColor: '#F1F1F1'};

export default class SideBar extends Component {


    renderMenuOrderNumber = (order) => {
        if (!order) {
            return null;
        }

        return <Right>
            <Badge primary>
                <Text>{order}</Text>
            </Badge>
        </Right>
    }

    loadDashboardScreen = (context) => {

        if (context.role !== EASY_SETUP && context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("Dashboard")} icon
                      style={context.screenType === "Dashboard" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="pie"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.dashboard")}</Text>
                </Body>
            </ListItem>
        )
    }

    loadActionLogScreen = (context) => {

        if (context.role !== EASY_SETUP && context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("ActionLog")} icon
                      style={context.screenType === "ActionLog" || context.screenType === "ActionLogData" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-analytics"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.actionLog")}</Text>
                </Body>
            </ListItem>
        )
    }

    loadSendMessageScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("SendMessage")} icon
                      style={context.screenType === "SendMessage" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-mail"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sendMessage")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadSendModeScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("SendProfile")}
                      icon
                      style={context.screenType === "SendProfile" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-construct"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sendMode")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadDeviceDetailScreen = (context) => {

        if (context.role !== EASY_SETUP && context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("DeviceDetail")} icon
                      style={context.screenType === "DeviceDetail" || context.screenType === "DeviceDetailData" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="md-search"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.device.detail")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadDeviceControlScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("DeviceControl")} icon
                      style={context.screenType === "DeviceControl" || context.screenType === "DeviceControlData" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="phone-portrait"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.device.control")}</Text>
                </Body>
            </ListItem>
        );
    }


    loadSensorTypeCreateScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("CreateSensorType")}
                      icon
                      style={context.screenType === "CreateSensorType" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-thermometer"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sensorType.create")}</Text>
                </Body>
                {this.renderMenuOrderNumber(1)}
            </ListItem>
        );
    }

    loadNodeSensorConfCreateScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("NodeSensorConfCreate")}
                      icon
                      style={context.screenType === "NodeSensorConfCreate" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-thermometer"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.nodeDataConf.create")}</Text>
                </Body>
                {this.renderMenuOrderNumber(3)}
            </ListItem>
        );
    }


    loadSensorTypeImportScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("ImportSensorType")}
                      icon
                      style={context.screenType === "ImportSensorType" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="wifi"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sensorType.import")}</Text>
                </Body>
                {this.renderMenuOrderNumber(2)}
            </ListItem>
        );
    }

    loadCreateCloudRuleScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("CreateCloudRule")}
                      icon
                      style={context.screenType === "CreateCloudRule" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#007AFF"}}>
                        <Icon active name="md-alarm"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.rule.create")}</Text>
                </Body>
            </ListItem>
        );
    }


    loadCreateSensorDataConfScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
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
                <Text>{lang(context.locale).getLabel("menu.sensorDataConf.create")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadImportSensorDataConfScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        return (
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
                <Text>{lang(context.locale).getLabel("menu.sensorDataConf.import")}</Text>
                </Body>
            </ListItem>
        );
    }


    loadYearlyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("YearlyGraph")} icon
                      style={context.screenType === "YearlyGraph" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#c4c"}}>
                        <Icon active name="ios-mail"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.reports.yearly")}</Text>
                </Body>
            </ListItem>
        );
    }


    loadMonthlyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("MonthlyGraph")} icon
                      style={context.screenType === "MonthlyGraph" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#c4c"}}>
                        <Icon active name="ios-mail"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.reports.monthly")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadWeeklyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("WeeklyGraph")} icon
                      style={context.screenType === "WeeklyGraph" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#c4c"}}>
                        <Icon active name="ios-mail"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.reports.weekly")}</Text>
                </Body>
            </ListItem>
        );
    }

    loadDailyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        return (

            <ListItem button={true} onPress={() => context.changeScreenByType("DailyGraph")} icon
                      style={context.screenType === "DailyGraph" ? activeStyle : {}}>
                <Left>
                    <Button style={{backgroundColor: "#c4c"}}>
                        <Icon active name="ios-mail"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.reports.daily")}</Text>
                </Body>
            </ListItem>
        );
    }

    render() {

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
                                <Title>{lang(context.locale).getLabel("menu.title")}</Title>
                                <Subtitle>...</Subtitle>
                                </Body>
                                <Right/>
                            </Header>

                            <Content>

                                {this.loadDashboardScreen(context)}
                                {this.loadActionLogScreen(context)}
                                {this.loadSendMessageScreen(context)}
                                {this.loadSendModeScreen(context)}
                                {this.loadDeviceDetailScreen(context)}
                                {this.loadDeviceControlScreen(context)}
                                {this.loadNodeSensorConfCreateScreen(context)}
                                {this.loadSensorTypeCreateScreen(context)}
                                {this.loadSensorTypeImportScreen(context)}
                                {this.loadCreateCloudRuleScreen(context)}
                                {this.loadCreateSensorDataConfScreen(context)}
                                {this.loadImportSensorDataConfScreen(context)}
                                {this.loadYearlyReportsGraphScreen(context)}
                                {this.loadMonthlyReportsGraphScreen(context)}
                                {this.loadWeeklyReportsGraphScreen(context)}
                                {this.loadDailyReportsGraphScreen(context)}



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

                            </Content>

                            <Footer style={{bottom: 10}}>
                                <Left>
                                    <Button iconLeft transparent danger onPress={() => context.logut()}>
                                        <Icon active name="ios-log-out"/>
                                        <Text>{lang(context.locale).getLabel("button.logout")}</Text>
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