import React, {Component} from 'react';
import {Body, Container, Content, ListItem, Right, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as sensor from 'MgrLib/sensor';

export default class NodeList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <NodeListContext goTo={this.props.goTo} context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class NodeListContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            nodes: []
        }
    }

    componentWillMount = () => {
        const {context} = this.props;

        context.showLoading();

        sensor.nodeList(this.props.context.token, context.deviceId).then(nodes => {
            this.setState({nodes});
            context.hideLoading();
        });
    }

    handleClickNode = (d) => {
        const {context} = this.props;
        context.setNode(d);
        context.setActivePage(this.props.goTo || "Dashboard");
    }

    render() {
        const {nodes} = this.state;

        if (!nodes) {
            return null;
        }

        return (
            <Container>
                <Content>
                    {
                        nodes.map((v) => {
                            return (
                                <ListItem key={v.nodeId} button={true} onPress={(d) => this.handleClickNode(v)}>
                                    <Body>
                                    <Text>{v.nodeId}</Text>
                                    <Text note>{v.description}</Text>
                                    </Body>
                                    <Right/>
                                </ListItem>
                            )
                        })
                    }
                </Content>
            </Container>
        );//return
    }//render
}