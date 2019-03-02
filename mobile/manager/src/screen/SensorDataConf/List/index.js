import React, {Component} from 'react';
import {Alert, Modal, ScrollView, TouchableHighlight, View} from 'react-native';
import {Badge, Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Text,} from 'native-base';
//custom
import * as sensor from 'MgrLib/sensor';

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

    handleDeleteSensorClick = (sensorId) => {

        const {context} = this.props;

        sensor.remove(context.token, sensorId).then(response => {
            console.info("delete sensor operation is success");
            this.setState({rerender: !this.state.rerender});
            context.showMessage("Sensor Başarıyla Silindi!").succes();
        });
    }

    render() {
        const {sensorConfigs} = this.state;
        const {context} = this.props;

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
                                            <Button transparent onPress={(d) => this.handleDeleteSensorClick(v.id)}>
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