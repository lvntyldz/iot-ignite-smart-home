import React, {Component} from 'react';
import {Modal} from 'react-native'
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
    Right,
    Separator,
    Text,
    Title,
} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';
import NodeSensorConfList from "MgrScreen/NodeSensorConf/List";
import * as sensor from "MgrLib/sensor";
import {LOG} from 'MgrLib/log';


export default class NodeSensorConfCreateData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <NodeSensorConfCreateDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class NodeSensorConfCreateDataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            pieData: [],
            selectedSensorType: null,
            name: null,
            offlineDataTime: null,
            dataThreshold: null,
            modalVisible: false,
            sensors: [],
        }
    }

    componentWillMount = async () => {
        /*
        const {context} = this.props;
        const self = this;
        context.showLoading();

        const endDate = moment.currTime();
        const startDate = moment.lastYear();
        let graphData = {
            labels: [],
            datasets: [{data: []}]
        };
        let pieData = [];

        const d = await sensor.getSensorHistory(context.token, context.deviceId, context.node.nodeId, context.sensor.id, startDate, endDate);

        await sensorDataDb.deleteAllSensorData();

        await d.map((v, k) => {
            const formattedSensorCreateDate = moment.getHumanDateAndTime(v.createDate);
            let sensorData = JSON.parse(v.data);
            sensorData = parseInt(sensorData[0]);
            sensorDataDb.addSensorData(v.deviceId, v.nodeId, v.sensorId, v.createDate, sensorData, formattedSensorCreateDate);
        });

        const dbData = await  sensorDataDb.getDailyAverageBySensorType(context.deviceId, context.node.nodeId, context.sensor.id);

        dbData.map((v, k) => {

            pieData.push({
                name: v.formattedDate,
                population: v.average,
                color: Color.getRandomColor(),
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            })

            graphData["labels"].push(v.formattedDate);
            graphData.datasets[0].data.push(v.average);
        });

        self.setState({graphData, pieData});
        context.hideLoading();
        */
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
        const {NodeSensorConfListRef} = this.refs;

        if (!context.node.nodeId) {
            this.setModalVisible(false);
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.nodeRequired")).warn();
            return;
        }

        if (!context.sensor.id) {
            this.setModalVisible(false);
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.sensorRequired")).warn();
            return;
        }

        context.showLoading();

        let config = {
            dataReadingFrequency: 5000,
            dataSendingFrequency: 5000,
            offlineData: ((state.offlineDataTime || 6) * 1000),
            thresholdType: 'quantity',
            dataThreshold: state.dataThreshold || 11
        }

        let data = {
            name: state.name,
            nodeId: context.node.nodeId,
            sensorId: context.sensor.id,
            config: JSON.stringify(config)
        }

        LOG("create node sensor config with given parameters.. data  :  ").success(data);

        sensor.createNodeSensorConfig(context.token, data).then(count => {
            console.info("add sensor configuration is success");
            this.setModalVisible(false);
            NodeSensorConfListRef.setState({rerender: !NodeSensorConfListRef.state.rerender});
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.sensorAddedSuccess")).succes();
            context.hideLoading();
        });
    }


    createSensorForm = () => {
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


                    <Item disabled>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.nodeName")}</Label>
                        <Input disabled placeholder={context.node.nodeId}/>
                    </Item>

                    <Item disabled>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.sensorName")}</Label>
                        <Input disabled placeholder={context.sensor.id}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>{lang(locale).getLabel("screen.sensorDataConf.configName")}</Label>
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

                <SideBarNav pageTitle={lang(locale).getLabel("screen.nodeSensorConf.createTitle")}/>

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

                    <NodeSensorConfList ref="NodeSensorConfListRef" context={context}/>

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