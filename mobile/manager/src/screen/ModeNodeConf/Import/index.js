import React, {Component} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {
    Badge,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as profile from 'MgrLib/profile';
import SideBarNav from 'MgrComponent/SideBarNav';
import ModeNodeConfList from 'MgrScreen/ModeNodeConf/List';
import {LOG} from 'MgrLib/log';

export default class ModeNodeConfImport extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ModeNodeConfImportContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ModeNodeConfImportContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            rerender: false,
            notInSensors: []
        }
    }

    componentDidMount = async () => {
        const {context} = this.props;
        const mode = await profile.getDefaultMode(context.token);
        console.info("mode : ", mode);
        this.setState({mode});
    }

    handleImportSensorClick = () => {

        //getNotInSensorTypeConfig
        const {context} = this.props;
        const {mode} = this.state;
        context.showLoading();

        profile.getNotInModeNodeConfig(context.token, mode.code).then(notInSensors => {
            LOG("notInSensors  : ").info(notInSensors);

            this.setState({notInSensors, modalVisible: true});
            context.hideLoading();
        });

    }

    importPreDefinedSensor = () => {
        const {notInSensors} = this.state;
        const {context} = this.props;

        return <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Import Sensor Type</Title>
                </Body>
                <Right>
                    <Button hasText transparent onPress={(d) => this.setModalVisible(false)}>
                        <Text>X</Text>
                    </Button>
                </Right>
            </Header>

            <Content>


                <Card>
                    {
                        notInSensors.map((v, k) => {

                            return (
                                <View key={v.id} bordered style={{margin: 10, padding: 1, backgroundColor: '#000'}}>
                                    <CardItem header bordered>
                                        <Text>{v.name}</Text>
                                        <Right>
                                            <Button transparent
                                                    onPress={(d) => this.handleImportDefinedSensorClick(v.id)}>
                                                <Badge success>
                                                    <Icon name="ios-checkmark"
                                                          style={{fontSize: 30, color: "#fff", lineHeight: 25}}/>
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
    }

    handleImportDefinedSensorClick = (id) => {

        const {context} = this.props;
        const {ModeNodeConfListRef} = this.refs;
        const {mode} = this.state;

        profile.addNodeConfigToMode(context.token, id, mode.code, {}).then(count => {
            console.info("add preDefined sensor operation is success");
            this.setModalVisible(false);
            ModeNodeConfListRef.setState({rerender: !ModeNodeConfListRef.state.rerender});
            context.showMessage("Sensor Başarıyla Eklendi!").succes();
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible, rerender: !this.state.rerender});
    }

    render() {
        const {sensors} = this.state;
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="ModeNodeConfImport"/>

                <Content>
                    <List>
                        <ListItem icon>
                            <Left/>
                            <Body/>
                            <Right>
                                <Button primary style={{margin: 2}} onPress={() => this.handleImportSensorClick()}>
                                    <Icon active name="download"/>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>

                    <ModeNodeConfList ref="ModeNodeConfListRef" context={context}/>

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        visible={this.state.modalVisible}
                    >
                        {this.importPreDefinedSensor()}

                    </Modal>

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