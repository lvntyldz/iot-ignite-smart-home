import React, {Component} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Badge, Body, Button, Card, CardItem, Container, Content, Icon, Label, Right, Text} from 'native-base';
//custom
import * as profile from 'MgrLib/profile';
import {LOG} from 'MgrLib/log';

export default class ModeNodeConfList extends Component {

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

        profile.getModeNodeConfig(context.token, mode.code).then(sensors => {
            LOG("sensors from API  : ").info(sensors);
            this.setState({sensors});
            context.hideLoading();
        });
    }

    componentDidMount = async () => {
        const {context} = this.props;
        const mode = await profile.getDefaultMode(context.token);
        LOG("mode : ").warn(mode);
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

        profile.removeModeNodeConf(context.token, sensorId, mode.code, {}).then(count => {
            LOG("delete sensor operation is success ").warn();

            this.setState({rerender: !this.state.rerender});
            context.showMessage("Mode/Node Konfigurasyonu Başarıyla Silindi!").succes();
        });

    }

    render() {
        const {sensors} = this.state;
        LOG("sensors : ").warn(sensors);

        if (!sensors) {
            return null;
        }

        return (
            <Container>
                <Content>
                    <Card>
                        {
                            sensors.map((v, k) => {

                                return (
                                    <View key={v.id} bordered style={{margin: 10, padding: 1, backgroundColor: '#000'}}>
                                        <CardItem header bordered>
                                            <Text>{v.name}</Text>
                                            <Right>
                                                <Button transparent onPress={(d) => this.handleDeleteSensorClick(v.id)}>
                                                    <Badge danger>
                                                        <Icon name="trash"
                                                              style={{fontSize: 22, color: "#fff", lineHeight: 20}}/>
                                                    </Badge>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>
                                            <Text><Label style={s.listTitle}>Node : </Label> {v.nodeId}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>
                                            <Text><Label style={s.listTitle}>Sensör : </Label> {v.sensorId}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>
                                            <Text>{v.config}</Text>
                                            </Body>
                                        </CardItem>
                                    </View>
                                );
                            })
                        }
                    </Card>
                </Content>
            </Container>
        );//return
    }//render
}

const s = StyleSheet.create({
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});