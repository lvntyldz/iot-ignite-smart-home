import React, {Component} from 'react';
import {Badge, Container, Content, Left, ListItem, Right, Separator, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as device from 'MgrLib/device';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
    componentWillMount = () => {
        const {context} = this.props;

        context.showLoading();

        device.getDeviceSummary(context.token).then(summary => {
            this.setState({summary: summary || {}});
        });

        device.getDeviceModels(context.token).then(model => {
            this.setState({model: model || []});
        });

        device.getDeviceOsList(context.token).then(os => {
            this.setState({os: os || []});
            context.hideLoading();
        });
    }

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            summary: {},
            model: [],
            os: []
        }
    }

    render() {
        const {context} = this.props;
        const {locale} = context;
        const {summary} = this.state;
        const {model} = this.state;
        const {os} = this.state;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.dashboard.title")}/>

                <Content>
                    <Separator bordered>
                        <Text>{lang(locale).getLabel("screen.dashboard.gateways")}</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.device.online")}</Text>
                        </Left>
                        <Right>
                            <Badge success>
                                <Text>{summary.onlineDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.device.offline")}</Text>
                        </Left>
                        <Right>
                            <Badge warning>
                                <Text>{summary.offlineDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.device.total")}</Text>
                        </Left>
                        <Right>
                            <Badge primary>
                                <Text>{summary.totalDevice}</Text>
                            </Badge>
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text>{lang(locale).getLabel("screen.dashboard.users")}</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.user.active")}</Text>
                        </Left>
                        <Right>
                            <Badge success>
                                <Text>{summary.activeUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.user.passive")}</Text>
                        </Left>
                        <Right>
                            <Badge warning>
                                <Text>{summary.totalUser - summary.activeUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>{lang(locale).getLabel("screen.dashboard.user.total")}</Text>
                        </Left>
                        <Right>
                            <Badge primary>
                                <Text>{summary.totalUser}</Text>
                            </Badge>
                        </Right>
                    </ListItem>

                    <Separator bordered>
                        <Text>{lang(locale).getLabel("screen.dashboard.deviceModel")}</Text>
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
                        <Text>{lang(locale).getLabel("screen.dashboard.deviceOs")}</Text>
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
