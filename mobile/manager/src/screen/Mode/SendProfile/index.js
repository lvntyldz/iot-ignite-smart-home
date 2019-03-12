import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from '../../../boot/Container/index';
import DeviceList from '../../Inventory/Device/index';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class SendProfile extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendProfileContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendProfileContext extends Component {
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


                <SideBarNav pageTitle="Send Profile"/>

                <Content>
                    <DeviceList goTo="SendProfileData"/>
                </Content>
            </Container>
        );//return
    }//render

}
