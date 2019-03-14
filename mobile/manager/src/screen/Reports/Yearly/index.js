import React, {Component} from 'react';
import {Container, Content,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';

export default class YearlyGraph extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <YearlyGraphContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class YearlyGraphContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    componentWillMount = () => {
        const {context} = this.props;
        context.setGraphReportRange("yearly");
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <SideBarNav pageTitle="YearlyGraph"/>

                <Content>
                    <DeviceList goTo="DeviceNodeList"/>
                </Content>
            </Container>
        );//return
    }//render

}
