import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class SideBarNav extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SideBarNavContext pageTitle={this.props.pageTitle} context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SideBarNavContext extends Component {

    render() {
        const {context} = this.props;

        return (
            <Header>
                <Body>
                <Title>{this.props.pageTitle || ""}</Title>
                </Body>
                <Left/>
                <Right>
                    <Button style={{backgroundColor: 'red'}} onPress={() => context.showSideBar()} icon light>
                        <Icon name='list'/>
                    </Button>
                </Right>
            </Header>
        );//return
    }//render

}