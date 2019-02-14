import React, {Component} from 'react';
import {
    Badge,
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title,
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';

export default class SensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SensorTypeContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            sensors: []
        }
    }

    componentWillMount = () => {

        sensor.getList(this.props.context.token).then(sensors => {
            this.setState({sensors});
        });
    }

    handleClickDevice = (d) => {
        const {context} = this.props;
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>SensorType</Title>
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
                        {
                            sensors.map((v, k) => {

                                return (
                                    <ListItem key={v.id} thumbnail>
                                        <Left/>
                                        <Body>
                                        <Text>{v.vendor}</Text>
                                        <Text note numberOfLines={1}>{v.type}---{v.dataType}</Text>
                                        </Body>
                                        <Right>
                                            <Badge danger>
                                                <Icon name="trash"
                                                      style={{fontSize: 22, color: "#fff", lineHeight: 20}}/>
                                            </Badge>
                                        </Right>
                                    </ListItem>
                                );
                            })
                        }

                    </List>
                </Content>
            </Container>
        );//return
    }//render
}