import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class DailyGraph extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <DailyGraphContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class DailyGraphContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        context.setGraphReportRange("weekly");
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="DailyGraph"/>

                <Content>
                    <DeviceList goTo="DeviceNodeList"/>
                </Content>
            </Container>
        );//return
    }//render

}
