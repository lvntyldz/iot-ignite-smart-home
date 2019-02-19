import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class ActionLog extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ActionLogContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ActionLogContext extends Component {
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
                    <Title>ActionLog</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Text>ActionLog will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}