//TODO:Development[Multilanguage support]
import React, {Component} from 'react';
import {Badge, Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Text,} from 'native-base';
//custom
import * as profile from 'MgrLib/profile';

export default class ModeSensorTypeConfList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            mode: {
                name: null,
                code: null
            },
            sensors: [],
        }
    }

    loadSesnsorListFromApi = () => {
        const {context} = this.props;
        const {mode} = this.state;
        context.showLoading();

        profile.getSensorTypeConfig(context.token, mode.code).then(sensors => {
            console.info(sensors);

            this.setState({sensors});
            context.hideLoading();
        });
    }

    componentDidMount = async () => {
        const {context} = this.props;
        const mode = await profile.getDefaultMode(context.token);
        console.info("mode : ", mode);
        this.setState({mode});
        this.loadSesnsorListFromApi();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.rerender != prevState.rerender) {
            this.loadSesnsorListFromApi();
        }
    }

    handleDeleteSensorClick = (sensorId) => {

        const {context} = this.props;
        const {mode} = this.state;

        profile.removeSensorTypeConf(context.token, sensorId, mode.code, {}).then(count => {
            console.info("delete sensor operation is success");
            this.setState({rerender: !this.state.rerender});
            context.showMessage("Sensor Configurasyonu Başarıyla Silindi!").succes();
        });

    }

    render() {
        const {sensors} = this.state;

        return (
            <Container>
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