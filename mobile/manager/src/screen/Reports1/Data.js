import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from 'native-base';

import {AreaChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
//custom
import {CtxConsumer} from 'MgrBoot/Container';


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
        }
    }

    render() {
        const {context} = this.props;
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Device Detail Data</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>

                    <AreaChart
                        style={{height: 200}}
                        data={data}
                        contentInset={{top: 30, bottom: 30}}
                        curve={shape.curveNatural}
                        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
                    >
                        <Grid/>
                    </AreaChart>

                </Content>

            </Container>
        );//return
    }//render
}