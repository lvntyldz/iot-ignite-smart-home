import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from '../Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class Reports1 extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <Reports1Context context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class Reports1Context extends Component {
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
                <SideBarNav pageTitle="Reports1"/>

                <Content>
                    <DeviceList goTo="Reports1Data"/>
                </Content>
            </Container>
        );//return
    }//render

}
