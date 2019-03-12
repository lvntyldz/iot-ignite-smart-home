import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from '../Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class ActionLog extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ActionLogContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ActionLogContext extends Component {
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
                <SideBarNav pageTitle="Action Logo"/>

                <Content>
                    <DeviceList goTo="ActionLogData"/>
                </Content>
            </Container>
        );//return
    }//render

}
