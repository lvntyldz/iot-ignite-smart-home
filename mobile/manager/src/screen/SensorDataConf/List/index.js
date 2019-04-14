import React, {Component} from 'react';
import {Badge, Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Text,} from 'native-base';

import * as sensor from 'MgrLib/sensor';
import {lang} from 'MgrLocale';

export default class SensorDataConfList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            sensorConfigs: [],
        }
    }

    loadSesnsorListFromApi = () => {
        const {context} = this.props;
        context.showLoading();
        sensor.listConfig(context.token).then(sensorConfigs => {
            this.setState({sensorConfigs});
            context.hideLoading();
        });
    }

    componentDidMount = () => {
        this.loadSesnsorListFromApi();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.rerender != prevState.rerender) {
            this.loadSesnsorListFromApi();
        }
    }

    handleDeleteSensorConfClick = (confId) => {

        const {context} = this.props;
        const {locale} = context;

        sensor.removeConfig(context.token, confId).then(response => {
            console.info("delete sensor operation is success");
            this.setState({rerender: !this.state.rerender});
            context.showMessage(lang(locale).getLabel("screen.sensorDataConf.message.sensorDeletedSuccess")).succes();
        });
    }

    render() {
        const {sensorConfigs} = this.state;

        if (!Array.isArray(sensorConfigs)) {
            return null;
        }

        return (
            <Container>
                <Content>
                    <List>
                        {
                            sensorConfigs.map((v, k) => {

                                return (
                                    <ListItem key={v.id} thumbnail>
                                        <Left/>
                                        <Body>
                                        <Text>{v.name}---{v.type}</Text>
                                        <Text note numberOfLines={1}>{v.config}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={(d) => this.handleDeleteSensorConfClick(v.id)}>
                                                <Badge danger>
                                                    <Icon name="trash"
                                                          style={{fontSize: 22, color: "#fff", lineHeight: 20}}/>
                                                </Badge>
                                            </Button>
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