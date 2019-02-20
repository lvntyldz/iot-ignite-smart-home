import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {
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
import SensorTypeList from 'MgrScreen/SensorType/List';

export default class CreateSensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateSensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateSensorTypeContext extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedDataType: "",
            sensorType: null,
            sensorVendor: null,
            modalVisible: false,
            rerender: false,
            sensors: [],
        }
    }

    handleAddSensorClick = () => {
        this.setState({modalVisible: true});
    }

    handleSaveSensorClick = () => {

        const {context} = this.props;
        const {SensorTypeListRef} = this.refs;
        const {sensors} = SensorTypeListRef.state;
        let isSensorExist = false;

        sensors.map((v, k) => {
            if (v.type === this.state.sensorType && v.vendor === this.state.sensorVendor && v.dataType === this.state.selectedDataType) {
                isSensorExist = true;
            }
        });

        if (isSensorExist === true) {
            this.setState({modalVisible: false});
            context.showMessage("Sensor Zaten Ekli!").warn();
            return;
        }

        sensor.add(context.token, {
            "dataType": this.state.selectedDataType,
            "type": this.state.sensorType,
            "vendor": this.state.sensorVendor
        }).then(count => {
            console.info("add sensor operation is success");
            this.setModalVisible(false);
            SensorTypeListRef.setState({rerender: !SensorTypeListRef.state.rerender});
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

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    onValueChange(value: string) {
        this.setState({
            selectedDataType: value
        });
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>CreateSensorType</Title>
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
                                <Button success style={{margin: 2}} onPress={() => this.handleAddSensorClick()}>
                                    <Icon active name="add"/>
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
                        {this.createSensorForm()}

                    </Modal>

                </Content>
            </Container>
        );//return
    }//render
}