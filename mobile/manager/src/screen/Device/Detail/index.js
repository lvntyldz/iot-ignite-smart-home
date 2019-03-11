import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Device/List';
import SideBarNav from 'MgrComponent/SideBarNav';


export default class DeviceDetail extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceDetailContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceDetailContext extends Component {
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
                <SideBarNav pageTitle="Device Detail"/>

                <Content>
                    <DeviceList goTo="DeviceDetailData"/>
                </Content>
            </Container>
        );//return
    }//render

}
