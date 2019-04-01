import React, {Component} from 'react';
import {View} from 'react-native'
import {Container, Content} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import * as sensor from 'MgrLib/sensor';
import * as moment from "MgrLib/moment";
import {lang} from 'MgrLocale';
import Graph from 'MgrComponent/Graph';
import * as Color from 'MgrUtil/Color';
import * as sensorDataDb from 'MgrLib/db/sensorData';

const defaultGraphData = {labels: [], datasets: [{data: []}]};

export default class MonthlyGraphData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <MonthlyGraphDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class MonthlyGraphDataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            graphData: defaultGraphData,
            pieData: [],
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

        const dbData = await  sensorDataDb.getMonthlyAverageBySensorType(context.deviceId, context.node.nodeId, context.sensor.id);

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
    }

    render() {

        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.reports.monthlyTitle")}/>

                <Content>
                    <Graph pieData={this.state.pieData} graphData={this.state.graphData}/>
                </Content>

            </Container>
        );//return
    }//render

}