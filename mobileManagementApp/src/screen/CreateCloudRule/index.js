import React, {Component} from 'react';
import {Badge, Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import * as cep from 'MgrLib/cep';
import * as moment from "MgrLib/moment";

export default class CreateCloudRule extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateCloudRuleContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateCloudRuleContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            rules: []
        }
    }

    componentDidMount = () => {

        const {context} = this.props;

        context.showLoading();

        cep.getList(context.token).then(rules => {
            this.setState({rules: rules});
        });

        context.hideLoading();
    }

    handleDeleteRuleClikc = (id) => {
        const {context} = this.props;

        cep.remove(context.token, id).then(response => {
            console.info("delete rule operation is success");
            this.setState({rerender: !this.state.rerender});
            context.showMessage("Kural Başarıyla Silindi!").succes();
        });

    }

    render() {

        return (
            <Container>

                <SideBarNav pageTitle="Kurallar"/>

                <Content>

                    <List>
                        <ListItem icon>
                            <Left>
                                <Text style={{fontWeight: 'bold'}}>Oluşturma Tarihi</Text>
                            </Left>
                            <Body>
                            <Text style={{fontWeight: 'bold'}}>Açıklama</Text>
                            </Body>
                        </ListItem>
                        {
                            this.state.rules.map((v, k) => {
                                return (
                                    <ListItem icon key={v.id}>
                                        <Left>
                                            <Text>{moment.getHumanDateAndTime(v.createDate)}</Text>
                                        </Left>
                                        <Body>
                                        <Text>{v.flowDescription}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={(d) => this.handleDeleteRuleClikc(v.id)}>
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
