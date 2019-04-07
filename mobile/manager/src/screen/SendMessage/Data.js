import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item as FormItem, Label, Text} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import * as workingset from 'MgrLib/workingset';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';

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

    handleSendMessageClick = () => {
        const {context} = this.props;
        const {locale} = context;

        context.showLoading();

        workingset.sendMessageByDevice(context.token, context.deviceId, {message: this.state.message}).then(count => {
            console.info("send message to workingset operation is success");
            context.hideLoading();
            context.showMessage(lang(locale).getLabel("screen.sendMessage.messageSentSuccess")).succes();
            this.setState({message: null});
        });
    }

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <SideBarNav pageTitle={lang(locale).getLabel("screen.sendMessage.title")}/>

                <Content style={{marginTop: 50}}>


                    <Form>
                        <FormItem floatingLabel style={{padding: 30}}>
                            <Label>{lang(locale).getLabel("input.message")}</Label>
                            <Input multiline={true} numberOfLines={10}
                                   onChangeText={(d) => {
                                       this.setState({message: d})
                                   }} value={this.state.message}
                            />
                        </FormItem>

                        <Button full primary
                                onPress={(c) => this.handleSendMessageClick(context)}>
                            <Text> {lang(locale).getLabel("button.sendMessage")} </Text>
                        </Button>

                    </Form>
                </Content>

            </Container>
        );//return
    }//render
}