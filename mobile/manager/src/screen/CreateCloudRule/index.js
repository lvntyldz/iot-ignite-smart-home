import React, {Component} from 'react';
import {Container, Content, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class CreateCloudRule extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateCloudRuleContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateCloudRuleContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    render() {

        return (
            <Container>

                <SideBarNav pageTitle="Create Cloud Rule"/>

                <Content>
                    <Text>CreateCloudRule will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
