import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class MonthlyGraph extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <MonthlyGraphContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class MonthlyGraphContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        context.setGraphReportRange("monthly");
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="MonthlyGraph"/>

                <Content>
                    <DeviceList goTo="DeviceNodeList"/>
                </Content>
            </Container>
        );//return
    }//render

}
