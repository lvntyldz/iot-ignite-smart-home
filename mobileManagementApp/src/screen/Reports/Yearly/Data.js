import React, {Component} from 'react';
import {Body, Container, Content, Left, ListItem, Text} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import * as sensor from 'MgrLib/sensor';
import * as moment from "MgrLib/moment";
import {lang} from 'MgrLocale';
import Graph from 'MgrComponent/Graph';
import * as Color from 'MgrUtil/Color';
import * as sensorDataDb from 'MgrLib/db/sensorData';

const defaultGraphData = {labels: [], datasets: [{data: []}]};

export default class YearlyGraphData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <YearlyGraphDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class YearlyGraphDataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            graphData: defaultGraphData,
            pieData: [],
            listData: []
        }
    }

    componentWillMount = async () => {
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

        const dbGraphData = await  sensorDataDb.getYearlyAverageBySensorType(context.deviceId, context.node.nodeId, context.sensor.id);
        const listData = await  sensorDataDb.getSensorDataBySensorType(context.deviceId, context.node.nodeId, context.sensor.id, 365);
        
        if (!listData || !dbGraphData) {
            self.setState({graphData: defaultGraphData, pieData: [], listData: []});
            context.hideLoading();
            return;
        }

        dbGraphData.map((v, k) => {

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

        self.setState({graphData, pieData, listData});
        context.hideLoading();
    }

    render() {

        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.reports.yearlyTitle")}/>

                <Content>
                    <Graph pieData={this.state.pieData} graphData={this.state.graphData}/>
                    {
                        this.state.listData.map((v, k) => {
                            return (
                                <ListItem icon key={v.id}>
                                    <Left>
                                        <Text>{v.formattedSensorCreateDate}</Text>
                                    </Left>
                                    <Body>
                                    <Text>{v.data}</Text>
                                    </Body>
                                </ListItem>
                            );
                        })
                    }
                </Content>

            </Container>
        );//return
    }//render

}