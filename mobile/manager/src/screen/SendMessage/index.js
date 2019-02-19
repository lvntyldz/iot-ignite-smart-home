import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class SendMessage extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendMessageContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendMessageContext extends Component {
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
                    <Title>SendMessage</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Text>SendMessage will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
