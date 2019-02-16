import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {
    Badge,
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item as FormItem,
    Label,
    Left,
    List,
    ListItem,
    Picker,
    Right,
    Text,
    Title,
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';

export default class SensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SensorTypeContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalContentType: null,
            selectedDataType: "",
            sensorType: null,
            sensorVendor: null,
            modalVisible: false,
            rerender: false,
            sensors: [],
            preDefinedSensors: []
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        context.showLoading();
        sensor.getList(context.token).then(sensors => {
            this.setState({sensors});
            context.hideLoading();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    handleAddSensorClick = () => {
        this.setState({modalVisible: true, modalContentType: "create"});
    }

    handleImportSensorClick = () => {

        sensor.getPreDefinedList(this.props.context.token).then(preDefinedSensors => {
            this.setState({preDefinedSensors, modalVisible: true, modalContentType: "import"});
        });
    }

    onValueChange(value: string) {
        this.setState({
            selectedDataType: value
        });
    }

    handleSaveSensorClick = () => {

        const {context} = this.props;

        sensor.add(context.token, {
            "dataType": this.state.selectedDataType,
            "type": this.state.sensorType,
            "vendor": this.state.sensorVendor
        }).then(count => {
            console.info("add sensor operation is success");
            this.setModalVisible(false);
        });
    }

    handleDeleteSensorClick = (sensorId) => {

        const {context} = this.props;

        sensor.remove(context.token, sensorId).then(response => {
            console.info("delete sensor operation is success");
            this.setState({rerender: !this.state.rerender});
        });
    }

    createSensorForm = () => {
        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Create Sensor Type</Title>
                </Body>
                <Right>
                    <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                        <Text>X</Text>
                    </Button>
                </Right>
            </Header>

            <Content>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Type</Label>
                        <Input onChangeText={(d) => {
                            this.setState({sensorType: d})
                        }} value={this.state.sensorType}/>
                    </FormItem>
                    <FormItem floatingLabel>
                        <Label>Vendor</Label>
                        <Input onChangeText={(d) => {
                            this.setState({sensorVendor: d})
                        }} value={this.state.sensorVendor}/>
                    </FormItem>

                    <Picker
                        mode="dropdown"
                        iosHeader="Data Type"
                        iosIcon={<Icon name="arrow-down"/>}
                        style={{width: "100%"}}
                        selectedValue={this.state.selectedDataType}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Select Data Type" value=""/>
                        <Picker.Item label="INTEGER" value="INTEGER"/>
                        <Picker.Item label="FLOAT" value="FLOAT"/>
                        <Picker.Item label="STRING" value="STRING"/>
                        <Picker.Item label="LOCATION" value="LOCATION"/>
                    </Picker>

                    <Button full primary style={{paddingBottom: 4}}
                            onPress={() => this.handleSaveSensorClick()}>
                        <Text> Save </Text>
                    </Button>

                </Form>
            </Content>

        </Container>
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

        sensor.addPreDefined(context.token, {id}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
        });
    }

    loadModalContentBy = () => {

        if (this.state.modalContentType === "create") {
            return this.createSensorForm();
        }

        if (this.state.modalContentType === "import") {
            return this.importPreDefinedSensor();
        }
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>SensorType</Title>
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
                                <Button success style={{margin: 2}} onPress={() => this.handleAddSensorClick()}>
                                    <Icon active name="add"/>
                                </Button>
                            </Right>
                        </ListItem>
                        {
                            sensors.map((v, k) => {

                                return (
                                    <ListItem key={v.id} thumbnail>
                                        <Left/>
                                        <Body>
                                        <Text>{v.vendor}</Text>
                                        <Text note numberOfLines={1}>{v.type}---{v.dataType}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={(d) => this.handleDeleteSensorClick(v.id)}>
                                                <Badge danger>
                                                    <Icon name="trash"
                                                          style={{fontSize: 22, color: "#fff", lineHeight: 20}}/>
                                                </Badge>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                );
                            })
                        }
                    </List>

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        visible={this.state.modalVisible}
                    >
                        {this.loadModalContentBy()}

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render
}