import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import DeviceList from 'MgrScreen/Device/List';

export default class SendConfiguration extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendConfigurationContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendConfigurationContext extends Component {
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
                    <Title>SendConfiguration</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <DeviceList goTo="SendConfigurationData"/>
                </Content>
            </Container>
        );//return
    }//render

}
