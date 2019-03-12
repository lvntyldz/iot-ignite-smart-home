import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import NodeList from 'MgrScreen/Inventory/Node';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class DeviceNodeList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceNodeListContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceNodeListContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="DeviceNodeList"/>

                <Content>
                    <NodeList goTo="NodeSensorList"/>
                </Content>
            </Container>
        );//return
    }//render

}
