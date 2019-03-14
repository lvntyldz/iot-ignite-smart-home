import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class WeeklyGraph extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <WeeklyGraphContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class WeeklyGraphContext extends Component {
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
                <SideBarNav pageTitle="WeeklyGraph"/>

                <Content>
                    <DeviceList goTo="DeviceNodeList"/>
                </Content>
            </Container>
        );//return
    }//render

}
