import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item as FormItem,
    Label,
    Left,
    Right,
    Text,
    Title
} from 'native-base';
//custom
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as workingset from 'MgrLib/workingset';


export default class SendMessageData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendMessageDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendMessageDataContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false,
            message: null
        }
    }

    handleLoginClick = () => {
        const {context} = this.props;
        
        context.showLoading();

        workingset.sendMessage(context.token, context.workingset, {message: this.state.message}).then(count => {
            console.info("send message to workingset operation is success");
            context.hideLoading();
        });
    }

    render() {
        const {context} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Device Detail Data</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content>


                    <Form>
                        <FormItem floatingLabel>
                            <Label>Message</Label>
                            <Input multiline={true} numberOfLines={10}
                                   onChangeText={(d) => {
                                       this.setState({message: d})
                                   }} value={this.state.message}
                            />
                        </FormItem>

                        <Button full primary style={{paddingBottom: 4}}
                                onPress={(c) => this.handleLoginClick(context)}>
                            <Text> Send Message </Text>
                        </Button>

                    </Form>
                </Content>

            </Container>
        );//return
    }//render
}