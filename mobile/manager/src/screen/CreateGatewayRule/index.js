import React, {Component} from 'react';
import {Container, Content, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class CreateGatewayRule extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateGatewayRuleContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateGatewayRuleContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    render() {
        return (
            <Container>
                <SideBarNav pageTitle="Create Gateway Rule"/>

                <Content>
                    <Text>CreateGatewayRule will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
