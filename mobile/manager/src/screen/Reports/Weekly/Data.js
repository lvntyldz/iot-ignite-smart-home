import React, {Component} from 'react';
import {View} from 'react-native'
import {Container, Content} from 'native-base';

import {AreaChart, BarChart, Grid, LineChart, PieChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import * as sensor from 'MgrLib/sensor';
import * as moment from "MgrLib/moment";
import {lang} from 'MgrLocale';
import * as sensorDataDb from 'MgrLib/db/sensorData';


const fill = 'rgb(134, 65, 244)'


export default class WeeklyGraphData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <WeeklyGraphDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class WeeklyGraphDataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            chartsData: []
        }
    }

    componentWillMount = async () => {
        const {context} = this.props;
        const self = this;
        context.showLoading();

        const endDate = moment.currTime();
        const startDate = moment.lastYear();
        let chartsData = [];


        const d = await sensor.getSensorHistory(context.token, context.deviceId, context.node.nodeId, context.sensor.id, startDate, endDate);

        await sensorDataDb.deleteAllSensorData();

        await d.map((v, k) => {
            const formattedSensorCreateDate = moment.getHumanDateAndTime(v.createDate);
            let sensorData = JSON.parse(v.data);
            sensorData = parseInt(sensorData[0]);
            sensorDataDb.addSensorData(v.deviceId, v.nodeId, v.sensorId, v.createDate, sensorData, formattedSensorCreateDate);
        });


        const dbData = await  sensorDataDb.getWeeklyAverageBySensorType(context.deviceId, context.node.nodeId, context.sensor.id);
        console.warn("dbData : ", dbData);

        dbData.map((v, k) => {
            chartsData.push(v.average);
        });

        self.setState({chartsData});
        context.hideLoading();

    }

    loadBarChart = () => {

        if (!this.state.chartsData || this.state.chartsData.length < 1) {
            return null;
        }

        return (
            <BarChart
                style={{height: 200}}
                data={this.state.chartsData}
                svg={{fill}}
                contentInset={{top: 30, bottom: 30}}
            >
                <Grid/>
            </BarChart>
        );
    }

    loadLineChart = () => {

        if (!this.state.chartsData || this.state.chartsData.length < 1) {
            return null;
        }

        return (
            <View style={{height: 200, padding: 20}}>
                <LineChart
                    style={{flex: 1}}
                    data={this.state.chartsData || []}
                    gridMin={0}
                    contentInset={{top: 10, bottom: 10}}
                    svg={{stroke: 'rgb(134, 65, 244)'}}
                >
                    <Grid/>
                </LineChart>
            </View>
        );
    }

    loadPieChart = () => {

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = this.state.chartsData
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        if (!this.state.chartsData || this.state.chartsData.length < 1) {
            return null;
        }

        return (
            <PieChart
                style={{height: 200}}
                data={pieData}
            />
        );
    }

    loadAreaChart = () => {

        if (!this.state.chartsData || this.state.chartsData.length < 1) {
            return null;
        }

        return (
            <AreaChart
                style={{height: 200}}
                data={this.state.chartsData || []}
                contentInset={{top: 30, bottom: 30}}
                curve={shape.curveNatural}
                svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
            >
                <Grid/>
            </AreaChart>
        );
    }

    render() {

        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.reports.weeklyTitle")}/>

                <Content>
                    {this.loadBarChart()}
                    {this.loadLineChart()}
                    {this.loadPieChart()}
                    {this.loadAreaChart()}
                </Content>

            </Container>
        );//return
    }//render
}