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
    Item,
    Label,
    Left,
    List,
    ListItem,
    Picker,
    Right,
    Separator,
    Text,
    Title,
} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';
import SensorDataConfList from 'MgrScreen/SensorDataConf/List';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

export default class CreateSensorDataConf extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateSensorDataConfContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateSensorDataConfContext extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSensorType: null,
            name: null,
            offlineDataTime: null,
            dataThreshold: null,
            modalVisible: false,
            sensors: [],
            rerender: false,
        }

    }

    loadSesnsorListFromApi = () => {
        const {context} = this.props;
        context.showLoading();
        sensor.getList(context.token).then(sensors => {
            this.setState({sensors});
            context.hideLoading();
        });
    }

    componentDidMount = () => {
        this.loadSesnsorListFromApi();
    }

    handleAddSensorClick = () => {
        this.setState({modalVisible: true});
    }

    handleSensorTypeChange(value: string) {
        this.setState({
            selectedSensorType: value
        });
    }

    handleSaveConfigurationBtnClick = () => {
        const {context} = this.props;
        const {locale} = context;
        const {state} = this;
        const {SensorDataConfListRef} = this.refs;

        if (!state.selectedSensorType) {
            this.setModalVisible(false);
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.sensorTypeRequired")).warn();
            return;
        }

        context.showLoading();

        let config = {
            dataReadingFrequency: 0,
            dataSendingFrequency: 0,
            offlineData: ((state.offlineDataTime || 5) * 1000),
            thresholdType: 'quantity',
            dataThreshold: state.dataThreshold || 6
        }

        let data = {
            name: state.name,
            sensorType: state.selectedSensorType,
            config: JSON.stringify(config)
        }

        sensor.createConfig(context.token, data).then(count => {
            console.info("add sensor configuration is success");
            this.setModalVisible(false);
            SensorDataConfListRef.setState({rerender: !SensorDataConfListRef.state.rerender});
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.sensorAddedSuccess")).succes();
            context.hideLoading();
        });
    }

    createSensorForm = () => {
        const {sensors} = this.state;
        const {context} = this.props;
        const {locale} = context;

        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>{lang(locale).getLabel("screen.sensorDataConf.createSensorTypeTitle")}</Title>
                </Body>
                <Right>
                    <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                        <Text>X</Text>
                    </Button>
                </Right>
            </Header>

            <Content>

                <Form>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down"/>}
                            style={{width: undefined}}
                            placeholder="Select Sensor Type"
                            placeholderStyle={{color: "#bfc6ea"}}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selectedSensorType}
                            onValueChange={this.handleSensorTypeChange.bind(this)}
                        >
                            {
                                sensors.map((v, k) => {
                                    return (
                                        <Picker.Item key={v.id} label={v.type + "---" + v.dataType} value={v.id}/>)
                                })
                            }
                        </Picker>
                    </Item>

                    <Item floatingLabel>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.sensorName")}</Label>
                        <Input onChangeText={(d) => {
                            this.setState({name: d})
                        }} value={this.state.name}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.offlineDataTime")}</Label>
                        <Input onChangeText={(d) => {
                            this.setState({offlineDataTime: d})
                        }} value={this.state.offlineDataTime}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.dataThreshold")} </Label>
                        <Input onChangeText={(d) => {
                            this.setState({dataThreshold: d})
                        }} value={this.state.dataThreshold}/>
                    </Item>

                </Form>

                <Separator bordered/>


                <Button full primary style={{paddingBottom: 4}}
                        onPress={() => this.handleSaveConfigurationBtnClick()}>
                    <Text> {lang(locale).getLabel("button.createConfiguration")}</Text>
                </Button>

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
                <SideBarNav pageTitle={lang(locale).getLabel("screen.sensorDataConf.createSensorTypeTitle")}/>

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

                    <SensorDataConfList ref="SensorDataConfListRef" context={context}/>

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