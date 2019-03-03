import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from '../../../boot/Container/index';
import DeviceList from '../../Device/List/index';

export default class SendProfile extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendProfileContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendProfileContext extends Component {
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
                <Header>
                    <Body>
                    <Title>SendProfile</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <DeviceList goTo="SendProfileData"/>
                </Content>
            </Container>
        );//return
    }//render

}
