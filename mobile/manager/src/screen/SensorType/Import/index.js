import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {Badge, Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Text,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';
import SensorTypeList from 'MgrScreen/SensorType/List';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

export default class ImportSensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ImportSensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ImportSensorTypeContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            rerender: false,
            preDefinedSensors: []
        }
    }

    handleImportSensorClick = () => {

        sensor.getPreDefinedList(this.props.context.token).then(preDefinedSensors => {
            this.setState({preDefinedSensors, modalVisible: true});
        });
    }

    importPreDefinedSensor = () => {
        const {preDefinedSensors} = this.state;
        const {context} = this.props;
        const {locale} = context;

        return <Container>

            <SideBarNav pageTitle={lang(locale).getLabel("screen.sensorType.importTitle")}/>

            <Content>
                <List>
                    {
                        preDefinedSensors.map((v, k) => {

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
        const {locale} = context;
        const {SensorTypeListRef} = this.refs;

        sensor.addPreDefined(context.token, {id}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
            SensorTypeListRef.setState({rerender: !SensorTypeListRef.state.rerender});
            context.showMessage(lang(locale).getLabel("screen.sensorType.message.addSensorSuccess")).succes();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.sensorType.importTitle")}/>

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

                    <SensorTypeList ref="SensorTypeListRef" context={context}/>

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