import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

export default class NodeSensorConfCreate extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <NodeSensorConfCreateContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class NodeSensorConfCreateContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        context.setInventoryConfRange("create");
    }

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.nodeSensorConf.createTitle")}/>

                <Content>
                    <DeviceList goTo="DeviceNodeListConf"/>
                </Content>
            </Container>
        );//return
    }//render

}
