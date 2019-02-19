import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class ImportSensorType extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <ImportSensorTypeContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class ImportSensorTypeContext extends Component {
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
                    <Title>ImportSensorType</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Text>ImportSensorType will be here</Text>
                </Content>
            </Container>
        );//return
    }//render

}
