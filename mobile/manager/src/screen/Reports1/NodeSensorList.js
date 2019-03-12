import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SensorList from '../Inventory/Sensor';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class NodeSensorList extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <NodeSensorListContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class NodeSensorListContext extends Component {
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
                <SideBarNav pageTitle="NodeSensorList"/>

                <Content>
                    {/*<DeviceList goTo="Reports4"/>*/}
                    <SensorList goTo="Reports1Data"/>
                </Content>
            </Container>
        );//return
    }//render

}
