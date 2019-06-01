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
    Title,
    View
} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import {lang} from 'MgrLocale';
import {EASY_SETUP, SMART_USAGE} from 'MgrEnum/Role';

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

    getCustomPropsWithSelectedItemList = (isSelected) => {
        const customProps = {...this.props}
        customProps["selected"] = isSelected;
        return customProps;
    }

    loadDashboardScreen = (context) => {

        if (context.role !== EASY_SETUP && context.role !== SMART_USAGE) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "Dashboard");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("Dashboard")} icon {...customProps} >
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "ActionLog" || context.screenType === "ActionLogData");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("ActionLog")}
                      icon  {...customProps}>
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
        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "SendMessage");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("SendMessage")}
                      icon  {...customProps} >
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "SendProfile");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("SendProfile")}
                      icon  {...customProps}>
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-construct"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sendMode")}</Text>
                </Body>
                {this.renderMenuOrderNumber(2)}
            </ListItem>
        );
    }

    loadDeviceDetailScreen = (context) => {

        if (context.role !== EASY_SETUP && context.role !== SMART_USAGE) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "DeviceDetail" || context.screenType === "DeviceDetailData");

        return (
            <View>
                {this.loadDividerWithLabel(lang(context.locale).getLabel("menu.gateway"))}

                <ListItem button={true} onPress={() => context.changeScreenByType("DeviceDetail")}
                          icon  {...customProps} >
                    <Left>
                        <Button style={{backgroundColor: "#60B760"}}>
                            <Icon active name="md-search"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>{lang(context.locale).getLabel("menu.device.detail")}</Text>
                    </Body>
                </ListItem>
            </View>
        );
    }

    loadDeviceControlScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "DeviceControl" || context.screenType === "DeviceControlData");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("DeviceControl")} icon  {...customProps} >
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "CreateSensorType");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("CreateSensorType")}
                      icon {...customProps} >
                <Left>
                    <Button style={{backgroundColor: "#60B760"}}>
                        <Icon active name="ios-thermometer"/>
                    </Button>
                </Left>
                <Body>
                <Text>{lang(context.locale).getLabel("menu.sensorType.create")}</Text>
                </Body>
                {this.renderMenuOrderNumber(2)}
            </ListItem>
        );
    }

    loadNodeSensorConfCreateScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "NodeSensorConfCreate");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("NodeSensorConfCreate")}
                      icon  {...customProps}>
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "ImportSensorType");

        return (
            <View>
                {this.loadDividerWithLabel(lang(context.locale).getLabel("menu.nodeAndSensor"))}
                <ListItem button={true} onPress={() => context.changeScreenByType("ImportSensorType")}
                          icon  {...customProps}>
                    <Left>
                        <Button style={{backgroundColor: "#60B760"}}>
                            <Icon active name="wifi"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>{lang(context.locale).getLabel("menu.sensorType.import")}</Text>
                    </Body>
                    {this.renderMenuOrderNumber(1)}
                </ListItem>
            </View>
        );
    }

    loadCreateCloudRuleScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "CreateCloudRule");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("CreateCloudRule")} icon {...customProps}>
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "CreateSensorDataConf");

        return (
            <ListItem button={true}
                      onPress={() => context.changeScreenByType("CreateSensorDataConf")} icon  {...customProps}>
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "ImportModeSensorTypeConf");

        return (
            <ListItem button={true}
                      onPress={() => context.changeScreenByType("ImportModeSensorTypeConf")} icon  {...customProps}>
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

    loadModeNodeConfScreen = (context) => {

        if (context.role !== EASY_SETUP) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "ModeNodeConfImport");

        return (
            <View>
                {this.loadDividerWithLabel(lang(context.locale).getLabel("menu.mode"))}

                <ListItem button={true}
                          onPress={() => context.changeScreenByType("ModeNodeConfImport")} icon  {...customProps}>
                    <Left>
                        <Button style={{backgroundColor: "#60B760"}}>
                            <Icon active name="md-planet"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>{lang(context.locale).getLabel("menu.modeNodeConf.import")}</Text>
                    </Body>
                    {this.renderMenuOrderNumber(1)}
                </ListItem>
            </View>
        );
    }


    loadYearlyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "YearlyGraph");

        return (
            <View>
                {this.loadDividerWithLabel(lang(context.locale).getLabel("menu.graphs"))}

                <ListItem button={true} onPress={() => context.changeScreenByType("YearlyGraph")}
                          icon  {...customProps}>
                    <Left>
                        <Button style={{backgroundColor: "#c4c"}}>
                            <Icon active name="ios-mail"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>{lang(context.locale).getLabel("menu.reports.yearly")}</Text>
                    </Body>
                </ListItem>
            </View>
        );
    }


    loadMonthlyReportsGraphScreen = (context) => {

        if (context.role !== SMART_USAGE) {
            return null;
        }

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "MonthlyGraph");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("MonthlyGraph")} icon  {...customProps}>
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "WeeklyGraph");

        return (
            <ListItem button={true} onPress={() => context.changeScreenByType("WeeklyGraph")} icon  {...customProps}>
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

        const customProps = this.getCustomPropsWithSelectedItemList(context.screenType === "DailyGraph");

        return (

            <ListItem button={true} onPress={() => context.changeScreenByType("DailyGraph")} icon  {...customProps}>
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

    loadDividerWithLabel = (label) => {
        if (!label) {
            return null;
        }
        return <ListItem itemDivider>
            <Text>{label}</Text>
        </ListItem>

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

                            <Content style={{marginBottom: 20}}>

                                {this.loadDashboardScreen(context)}
                                {this.loadActionLogScreen(context)}
                                {this.loadDeviceDetailScreen(context)}
                                {this.loadDeviceControlScreen(context)}
                                {this.loadSendMessageScreen(context)}
                                {this.loadSensorTypeImportScreen(context)}
                                {this.loadSensorTypeCreateScreen(context)}
                                {this.loadNodeSensorConfCreateScreen(context)}
                                {this.loadCreateCloudRuleScreen(context)}
                                {/*this.loadCreateSensorDataConfScreen(context)*/}
                                {/*this.loadImportSensorDataConfScreen(context)*/}
                                {this.loadModeNodeConfScreen(context)}
                                {this.loadSendModeScreen(context)}
                                {this.loadYearlyReportsGraphScreen(context)}
                                {this.loadMonthlyReportsGraphScreen(context)}
                                {this.loadWeeklyReportsGraphScreen(context)}
                                {this.loadDailyReportsGraphScreen(context)}

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