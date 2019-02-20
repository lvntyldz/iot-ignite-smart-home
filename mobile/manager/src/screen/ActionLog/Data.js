import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
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
import * as actionLog from 'MgrLib/actionLog';

export default class ActionLogData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ActionLogDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ActionLogDataContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            modalVisible: false,
            summary: {content: []},
            detail: {
                sendToDeviceStatus: {
                    status: "1",
                    tryCount: "0",
                    body: "[ { \"params\" : [ ] , \"type\" : \"reboot\"}]",
                    sentDate: "1970-01-01T02:00:00.000+02:00"
                },
                deliveryFromDeviceStatus: {
                    desc: null,
                    deliveredDate: ""
                },
                executionInDeviceStatus: {
                    result: null
                }
            }
        }
    }

    componentDidMount = () => {
        const {context} = this.props;

        context.showLoading();

        actionLog.getSummary(context.token, context.deviceId).then(summary => {
            this.setState({summary});
            context.hideLoading();

        });
    }

    dateAndTime = (d) => {

        if (!d) {
            d = "2022-02-02T02:12:22.033+03:00"
        }

        const splittedDT = d.split("T", 2);
        const datePart = splittedDT[0];
        let timePart = splittedDT[1];
        timePart = timePart.substr(0, 8);

        return {
            dateOnly: datePart,
            timeOnly: timePart,
            dateAndTime: datePart + " " + timePart
        }

    }

    getLogDetailFromCloud = (actionCode) => {

        const {context} = this.props;

        context.showLoading();
        this.setModalVisible(true);

        actionLog.getDetail(context.token, context.device, actionCode).then(detail => {
            context.hideLoading();
            this.setState({detail});
        });
    }

    loadLogDetail = () => {
        const {sendToDeviceStatus} = this.state.detail;
        const {deliveryFromDeviceStatus} = this.state.detail;
        const {executionInDeviceStatus} = this.state.detail;

        const header = <Header>
            <Left/>
            <Body>
            <Title>Log Detail</Title>
            </Body>
            <Right>
                <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                    <Text>X</Text>
                </Button>
            </Right>
        </Header>;

        if (!sendToDeviceStatus) {
            return header;
        }

        return <Container>
            {header}
            <Content>

                <Separator bordered>
                    <Text>Cloud To Device</Text>
                </Separator>
                <ListItem>
                    <Left>
                        <Text> BODY</Text>
                    </Left>
                    <Body>
                    <Text>{sendToDeviceStatus.body}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> STATUS</Text>
                    </Left>
                    <Body>
                    <Text>{sendToDeviceStatus.status}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> TRY COUNT</Text>
                    </Left>
                    <Body>
                    <Text>{sendToDeviceStatus.tryCount}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> SENT DATE </Text>
                    </Left>
                    <Body>
                    <Text>{this.dateAndTime(sendToDeviceStatus.sentDate).dateAndTime}</Text>
                    </Body>
                </ListItem>

                <Separator bordered>
                    <Text>Device To Cloud</Text>
                </Separator>
                <ListItem>
                    <Left>
                        <Text> MESSAGE </Text>
                    </Left>
                    <Body>
                    <Text>{deliveryFromDeviceStatus.desc || "There are no message!"}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Text>{deliveryFromDeviceStatus.deliveredDate}</Text>
                </ListItem>

                <Separator bordered>
                    <Text>Execution Result</Text>
                </Separator>
                <ListItem>
                    <Left>
                        <Text> RESULT </Text>
                    </Left>
                    <Body>
                    <Text>{executionInDeviceStatus.result || "No result found!"}</Text>
                    </Body>
                </ListItem>


            </Content>
        </Container>
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    render() {
        const {context} = this.props;
        const {content} = this.state.summary;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>ActionLogData</Title>
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
                        <Text>Logs</Text>
                    </Separator>
                    {content.map((v, k) => {
                        return (
                            <ListItem key={v.code}>
                                <Left>
                                    <Text>{v.command}</Text>
                                </Left>
                                <Body>
                                <Text>{this.dateAndTime(v.sentDate).dateAndTime}</Text>
                                </Body>
                                <Right>
                                    <Button onPress={(d) => this.getLogDetailFromCloud(v.responseId)}
                                            style={{backgroundColor: "#007AFF"}}>
                                        <Icon active name="search" style={{width: 20, height: 20}}/>
                                    </Button>
                                </Right>
                            </ListItem>
                        );
                    })}

                    <ListItem last>
                        <Left/>
                        <Right/>
                    </ListItem>

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        visible={this.state.modalVisible}
                    >
                        {this.loadLogDetail()}

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render

}
