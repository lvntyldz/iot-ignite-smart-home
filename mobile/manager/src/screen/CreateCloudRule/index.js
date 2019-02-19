import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class CreateCloudRule extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <CreateCloudRuleContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class CreateCloudRuleContext extends Component {
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
                    <Title>CreateCloudRule</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Text>CreateCloudRule will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
