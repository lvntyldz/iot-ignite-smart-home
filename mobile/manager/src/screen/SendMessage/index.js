import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from '../Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class SendMessage extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendMessageContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendMessageContext extends Component {
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

                <SideBarNav pageTitle="Send Message"/>

                <Content>
                    <DeviceList goTo="SendMessageData"/>
                </Content>
            </Container>
        );//return
    }//render

}
