import {lang} from "../../locale";
import React, {Component} from 'react';
import {WebView} from 'react-native';
import {CLOUD_SIGN_UP_URL} from 'MgrConfig';

import {Button, Container, Text} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class SignUp extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SignUpContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SignUpContext extends Component {

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>

                <Button full primary style={{paddingBottom: 4}}
                        onPress={() => context.setActivePage("Login")}>
                    <Text> {lang(locale).getLabel("button.back")} </Text>
                </Button>

                <WebView
                    style={{flex: 1}}
                    source={{uri: CLOUD_SIGN_UP_URL}}
                />
            </Container>
        );
    }
}
