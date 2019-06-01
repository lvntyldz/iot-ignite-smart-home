//TODO:Development[Multilanguage support]
import React, {Component} from 'react';
import {Modal} from 'react-native';
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
import ModeSensorInventoryConfList from 'MgrScreen/Mode/SensorTypeConf/List';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class ImportModeSensorInventoryConf extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ImportModeSensorInventoryConfContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ImportModeSensorInventoryConfContext extends Component {
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
        const {ModeSensorInventoryConfListRef} = this.refs;

        sensor.addPreDefined(context.token, {id}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
            ModeSensorInventoryConfListRef.setState({rerender: !ModeSensorInventoryConfListRef.state.rerender});
            context.showMessage("Sensor Başarıyla Eklendi!").succes();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="ImportModeSensorInventoryConf"/>

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

                    <ModeSensorInventoryConfList ref="ModeSensorInventoryConfListRef" context={context}/>

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
