import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {
    Badge,
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title,
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as profile from 'MgrLib/profile';
import ModeSensorTypeConfList from 'MgrScreen/Mode/SensorTypeConf/List';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class ModeNodeConfImport extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ModeNodeConfImportContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ModeNodeConfImportContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            rerender: false,
            notInSensors: []
        }
    }

    componentDidMount = async () => {
        const {context} = this.props;
        const mode = await profile.getDefaultMode(context.token);
        console.info("mode : ", mode);
        this.setState({mode});
    }

    handleImportSensorClick = () => {

        //getNotInSensorTypeConfig
        const {context} = this.props;
        const {mode} = this.state;
        context.showLoading();

        profile.getNotInSensorTypeConfig(context.token, mode.code).then(notInSensors => {
            console.info(notInSensors);

            this.setState({notInSensors, modalVisible: true});
            context.hideLoading();
        });

    }

    importPreDefinedSensor = () => {
        const {notInSensors} = this.state;
        const {context} = this.props;

        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Import Sensor Type</Title>
                </Body>
                <Right>
                    <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                        <Text>X</Text>
                    </Button>
                </Right>
            </Header>

            <Content>
                <List>
                    {
                        notInSensors.map((v, k) => {

                            return (
                                <ListItem key={v.id} thumbnail>
                                    <Left/>
                                    <Body>
                                    <Text>{v.vendor}</Text>
                                    <Text note numberOfLines={1}>{v.type}---{v.dataType}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={(d) => this.handleImportDefinedSensorClick(v.id)}>
                                            <Badge success>
                                                <Icon name="ios-checkmark"
                                                      style={{fontSize: 30, color: "#fff", lineHeight: 25}}/>
                                            </Badge>
                                        </Button>
                                    </Right>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Content>
        </Container>
    }

    handleImportDefinedSensorClick = (id) => {

        const {context} = this.props;
        const {ModeSensorTypeConfListRef} = this.refs;
        const {mode} = this.state;

        profile.addSensorConfigToMode(context.token, id, mode.code, {}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
            ModeSensorTypeConfListRef.setState({rerender: !ModeSensorTypeConfListRef.state.rerender});
            context.showMessage("Sensor Başarıyla Eklendi!").succes();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="ModeNodeConfImport"/>

                <Content>
                    <List>
                        <ListItem icon>
                            <Left/>
                            <Body/>
                            <Right>
                                <Button primary style={{margin: 2}} onPress={() => this.handleImportSensorClick()}>
                                    <Icon active name="download"/>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>

                    <ModeSensorTypeConfList ref="ModeSensorTypeConfListRef" context={context}/>

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        visible={this.state.modalVisible}
                    >
                        {this.importPreDefinedSensor()}

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render
}