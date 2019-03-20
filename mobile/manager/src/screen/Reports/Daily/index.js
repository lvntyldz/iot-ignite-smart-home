import React, {Component} from 'react';
import {Container, Content,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Inventory/Device';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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
        context.setGraphReportRange("daily");
    }

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.reports.dailyTitle")}/>

                <Content>
                    <DeviceList goTo="DeviceNodeList"/>
                </Content>
            </Container>
        );//return
    }//render

}
