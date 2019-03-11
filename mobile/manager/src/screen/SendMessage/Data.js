import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item as FormItem, Label, Text} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as workingset from 'MgrLib/workingset';
import SideBarNav from 'MgrComponent/SideBarNav';


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

        context.showLoading();

        workingset.sendMessage(context.token, context.workingset, {message: this.state.message}).then(count => {
            console.info("send message to workingset operation is success");
            context.hideLoading();
            context.showMessage("Mesajınız Cihaza Başarıyla Gönderildi!").succes();
            this.setState({message: null});
        });
    }

    render() {
        const {context} = this.props;

        return (
            <Container>

                <SideBarNav pageTitle="Device Detail Data"/>

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
                                onPress={(c) => this.handleSendMessageClick(context)}>
                            <Text> Send Message </Text>
                        </Button>

                    </Form>
                </Content>

            </Container>
        );//return
    }//render
}