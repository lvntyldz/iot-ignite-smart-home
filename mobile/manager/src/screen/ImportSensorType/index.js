import React, {Component} from 'react';
import {Container, Content, Text,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class ImportSensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ImportSensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ImportSensorTypeContext extends Component {
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
                <SideBarNav pageTitle="Import Sensor Type"/>

                <Content>
                    <Text>ImportSensorType will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
