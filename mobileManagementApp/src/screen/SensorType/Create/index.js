import React, {Component} from 'react';
import { Modal} from 'react-native';
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

import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';
import SensorTypeList from 'MgrScreen/SensorType/List';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
        const {locale} = context;
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
            context.showMessage(lang(locale).getLabel("screen.sensorType.message.sensorAlreadyExists")).warn();
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
            context.showMessage(lang(locale).getLabel("screen.sensorType.message.addSensorSuccess")).succes();
        });
    }

    createSensorForm = () => {
        const {context} = this.props;
        const {locale} = context;

        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>{lang(locale).getLabel("screen.sensorType.createTitle")}</Title>
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
                        <Label>{lang(locale).getLabel("screen.sensorType.type")}</Label>
                        <Input onChangeText={(d) => {
                            this.setState({sensorType: d})
                        }} value={this.state.sensorType}/>
                    </FormItem>
                    <FormItem floatingLabel>
                        <Label>{lang(locale).getLabel("screen.sensorType.vendor")}</Label>
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
                        <Picker.Item label={lang(locale).getLabel("screen.sensorType.dataType")} value=""/>
                        <Picker.Item label="INTEGER" value="INTEGER"/>
                        <Picker.Item label="FLOAT" value="FLOAT"/>
                        <Picker.Item label="STRING" value="STRING"/>
                        <Picker.Item label="LOCATION" value="LOCATION"/>
                    </Picker>

                    <Button full primary style={{paddingBottom: 4}}
                            onPress={() => this.handleSaveSensorClick()}>
                        <Text> {lang(locale).getLabel("button.save")} </Text>
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
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.sensorType.createTitle")}/>

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