import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from '../Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.sendMessage.title")}/>

                <Content>
                    <DeviceList goTo="SendMessageData"/>
                </Content>
            </Container>
        );//return
    }//render

}
