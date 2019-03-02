import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    FormItem,
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
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';
import SensorDataConfList from 'MgrScreen/SensorDataConf/List';

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
        const {state} = this;
        const {SensorDataConfListRef} = this.refs;

        if (!state.selectedSensorType) {
            this.setModalVisible(false);
            context.showMessage("Önce SensorType seçmelisiniz!").warn();
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
            context.showMessage("Sensor Konfigurasyonu Başarıyla Eklendi!").succes();
            context.hideLoading();
        });
    }

    createSensorForm = () => {
        const {sensors} = this.state;

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
                        <Label>Name</Label>
                        <Input onChangeText={(d) => {
                            this.setState({name: d})
                        }} value={this.state.name}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Offline Data Time (Sec)</Label>
                        <Input onChangeText={(d) => {
                            this.setState({offlineDataTime: d})
                        }} value={this.state.offlineDataTime}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Data Threshold Time (Sec) </Label>
                        <Input onChangeText={(d) => {
                            this.setState({dataThreshold: d})
                        }} value={this.state.dataThreshold}/>
                    </Item>

                </Form>

                <Separator bordered/>


                <Button full primary style={{paddingBottom: 4}}
                        onPress={() => this.handleSaveConfigurationBtnClick()}>
                    <Text> Create Configuration </Text>
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
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>CreateSensorDataConf</Title>
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