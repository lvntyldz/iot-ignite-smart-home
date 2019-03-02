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
import * as sensor from 'MgrLib/sensor';
import SensorTypeList from 'MgrScreen/SensorType/List';

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
        const {SensorTypeListRef} = this.refs;

        sensor.addPreDefined(context.token, {id}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
            SensorTypeListRef.setState({rerender: !SensorTypeListRef.state.rerender});
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
                <Header>
                    <Body>
                    <Title>ImportSensorType</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

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