import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import SensorList from '../Inventory/Sensor';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
        const {locale} = context;
        const {inventoryConfRange} = context;

        let goTo = null;

        if (inventoryConfRange === "create") {
            goTo = "NodeSensorConfCreateData";
        }

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.reports.sensorList")}/>

                <Content>
                    <SensorList goTo={goTo}/>
                </Content>
            </Container>
        );//return
    }//render

}
