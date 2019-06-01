import React, {Component} from 'react';
import {Body, Container, Content, ListItem, Right, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import {LOG} from 'MgrLib/log';


export default class SensorList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SensorListContext goTo={this.props.goTo} context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SensorListContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            sensors: []
        }
    }

    handleClickSensor = (d) => {
        const {context} = this.props;

        LOG("clicked sensor params  : ").info(d);
        LOG("clicked sensor props  : ").info(this.props);

        context.setSensor(d);
        context.setActivePage(this.props.goTo || "Dashboard");
    }

    render() {
        const {context} = this.props;
        const sensors = context.node.things;

        if (!sensors) {
            return null;
        }

        return (
            <Container>
                <Content>
                    {
                        sensors.map((v) => {
                            return (
                                <ListItem key={v.id} button={true} onPress={(d) => this.handleClickSensor(v)}>
                                    <Body>
                                    <Text>{v.type} -- {v.vendor}</Text>
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