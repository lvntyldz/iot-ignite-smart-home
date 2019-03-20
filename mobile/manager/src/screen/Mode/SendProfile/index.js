import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.mode.sendProfileTitle")}/>

                <Content>
                    <DeviceList goTo="SendProfileData"/>
                </Content>
            </Container>
        );//return
    }//render

}
