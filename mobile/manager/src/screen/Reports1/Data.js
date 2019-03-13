import React, {Component} from 'react';
import {View} from 'react-native'
import {Container, Content} from 'native-base';

import {AreaChart, BarChart, Grid, LineChart, PieChart, StackedAreaChart, XAxis, YAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import * as sensor from 'MgrLib/sensor';
import * as moment from "MgrLib/moment";


export default class Reports1Data extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <Reports1DataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class Reports1DataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            chartsData: []
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        const self = this;
        context.showLoading();

        const endDate = moment.currTime();
        const startDate = moment.lastYear();
        let chartsData = [];

        sensor.getSensorHistory(context.token, context.deviceId, context.node.nodeId, context.sensor.id, startDate, endDate).then(d => {

            d.map((v, k) => {
                const sensorData = JSON.parse(v.data);
                chartsData.push(parseInt(sensorData[0]));
            });

            self.setState({chartsData});
            context.hideLoading();
        });
    }

    render() {
        const {context} = this.props;
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const fill = 'rgb(134, 65, 244)'
        const contentInset = {top: 20, bottom: 20}
        const data2 = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff']
        const keys = ['apples', 'bananas', 'cherries', 'dates']
        const svgs = [
            {onPress: () => console.log('apples')},
            {onPress: () => console.log('bananas')},
            {onPress: () => console.log('cherries')},
            {onPress: () => console.log('dates')},
        ]

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

        return (
            <Container>

                <SideBarNav pageTitle="Reports1 Graph"/>

                <Content>

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
                        <XAxis
                            style={{marginHorizontal: -10}}
                            data={this.state.chartsData || []}
                            formatLabel={(value, index) => index}
                            contentInset={{left: 10, right: 10}}
                            svg={{fontSize: 10, fill: 'black'}}
                        />
                    </View>

                    <YAxis
                        data={this.state.chartsData || []}
                        contentInset={contentInset}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={value => `${value}ºC`}
                    />
                    <LineChart
                        style={{flex: 1, marginLeft: 16}}
                        data={this.state.chartsData || []}
                        svg={{stroke: 'rgb(134, 65, 244)'}}
                        contentInset={contentInset}
                    >
                        <Grid/>
                    </LineChart>

                    <PieChart
                        style={{height: 200}}
                        data={pieData}
                    />

                    <AreaChart
                        style={{height: 200}}
                        data={this.state.chartsData || []}
                        contentInset={{top: 30, bottom: 30}}
                        curve={shape.curveNatural}
                        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
                    >
                        <Grid/>
                    </AreaChart>

                    <BarChart
                        style={{height: 200}}
                        data={data}
                        svg={{fill}}
                        contentInset={{top: 30, bottom: 30}}
                    >
                        <Grid/>
                    </BarChart>

                    <StackedAreaChart
                        style={{height: 200, paddingVertical: 16}}
                        data={data2}
                        keys={keys}
                        colors={colors}
                        curve={shape.curveNatural}
                        showGrid={false}
                        svgs={svgs}
                    />

                    <LineChart
                        style={{height: 200}}
                        data={this.state.chartsData || []}
                        svg={{stroke: 'rgb(134, 65, 244)'}}
                        contentInset={{top: 20, bottom: 20}}
                    >
                        <Grid/>
                    </LineChart>

                </Content>

            </Container>
        );//return
    }//render
}