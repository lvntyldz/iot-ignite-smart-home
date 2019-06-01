import React, {Component} from 'react';
import {Body, Card, CardItem, Container, DeckSwiper, Left, Text, View} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import {Dimensions} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

export default class Graph extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <GraphContext
                        pieData={this.props.pieData}
                        graphData={this.props.graphData}
                        context={context}
                    />;
                }}
            </CtxConsumer>
        );//return
    }//render
}

const graphStyle = {marginVertical: 8, borderRadius: 16}

const chartConfig = {
    backgroundColor: '#E43C45',
    backgroundGradientFrom: '#1787FB',
    backgroundGradientTo: '#373737',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
}

const defaultPieData = [];
const defaultGraphData = {labels: [], datasets: [{data: []}]};

export class GraphContext extends Component {

    loadLineKit = () => {
        let {graphData} = this.props;
        if (!graphData) {
            graphData = defaultGraphData;
        }

        console.info("graphData : ", graphData);

        return (
            <View style={{margin: 10}}>
                <LineChart
                    style={graphStyle}
                    data={graphData}
                    width={screenWidth - 20}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>
        );
    }

    loadBarKit = () => {
        let {graphData} = this.props;
        if (!graphData) {
            graphData = defaultGraphData;
        }

        console.info("graphData : ", graphData);

        return (<View style={{margin: 10}}>
                <BarChart
                    style={graphStyle}
                    data={graphData}
                    width={screenWidth - 20}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        );
    }

    loadPieKit = () => {

        let {pieData} = this.props;
        if (!pieData) {
            pieData = defaultPieData;
        }

        console.info("pieData : ", pieData);

        return (<View style={{margin: 10, backgroundColor: '#c4c4c4', borderRadius: 16, padding: 5}}>
            <PieChart
                style={graphStyle}
                data={pieData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
            />
        </View>);
    }

    render() {
        const cards = [
            {title: 'Line', cardContent: this.loadLineKit()},
            {title: 'Pie', cardContent: this.loadPieKit()},
            {title: 'Bar', cardContent: this.loadBarKit()}
        ];

        return (
            <Container style={{flex: 1, maxHeight: 350}}>
                <DeckSwiper
                    dataSource={cards}
                    renderItem={item =>
                        <Card style={{elevation: 3}}>

                            <CardItem>
                                <Left>
                                    <Body>
                                    <Text>{item.title}</Text>
                                    <Text note>Graph Data</Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem cardBody>
                                {item.cardContent}
                            </CardItem>

                        </Card>
                    }
                />
            </Container>
        )
    }//render
}