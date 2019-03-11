import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Device/List';
import SideBarNav from 'MgrComponent/SideBarNav';


export default class DeviceControl extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DeviceControlContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DeviceControlContext extends Component {
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
                <SideBarNav pageTitle="Device Control"/>
                <Content>
                    <DeviceList goTo="DeviceControlData"/>
                </Content>
            </Container>
        );//return
    }//render

}
