import React, {Component} from 'react';
import {Container, Text} from 'native-base';
import {Col, Grid, Row} from 'react-native-easy-grid';

import {CtxConsumer} from 'MgrBoot/Container';
import {EASY_SETUP, SMART_USAGE} from 'MgrEnum/Role';
import {lang} from 'MgrLocale';

export default class Role extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <RoleContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class RoleContext extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
        }
    }

    handleAppRoleClick = (d) => {
        const {context} = this.props;
        context.setRole(d);
        context.setActivePage("Dashboard");
    }

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <Grid style={{
                    backgroundColor: 'blue'
                }}>
                    <Row onPress={() => this.handleAppRoleClick(SMART_USAGE)}
                         style={{backgroundColor: '#1787FB', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#FFF', fontSize: 50,}}>{lang(locale).getLabel("screen.role.smartUsage")}</Text>
                    </Row>

                    <Row onPress={() => this.handleAppRoleClick(EASY_SETUP)}
                         style={{backgroundColor: '#17A346', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#FFF', fontSize: 50,}}>{lang(locale).getLabel("screen.role.easySetup")}</Text>
                    </Row>
                </Grid>

            </Container>
        );//return
    }//render

}
