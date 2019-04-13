import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Form,
    Header,
    Input,
    Item as FormItem,
    Label,
    Separator,
    Text,
    Title,
    View
} from 'native-base';

import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import validate from 'validate.js';
//custom
import {lang} from 'MgrLocale';
import {ENGLISH, TURKISH} from 'MgrEnum/Locale';
import * as login from 'MgrLib/login';
import * as tokenDb from 'MgrLib/db/token';
import * as userDb from 'MgrLib/db/user';
import {CtxConsumer} from 'MgrBoot/Container';
import {constraints} from 'MgrUtil/ValidationRule';

export default class Login extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <LoginContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class LoginContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //TODO:Remove login data from state
            email: 'lewenty@gmail.com',
            password: null
        }
    }

    componentWillMount = () => {
        userDb.getLastRemembered().then(r => {
            if (!r) {
                return;
            }

            this.setState({email: r.email, password: r.password});
        });
    }

    handleLoginClick = () => {
        const {context} = this.props;
        const {locale} = context;

        const validationRes = validate.validate({
            userEmail: this.state.email,
            userPwd: this.state.password
        }, constraints);

        if (validationRes && (validationRes.userEmail || validationRes.userPwd)) {
            context.showMessage("Kullanıcı Adı veya Şifre Hatalı!").warn();
            return;
        }

        context.showLoading();
        login.loginToCloud(this.state.email, this.state.password).then(token => {
            tokenDb.addToken(token);
            userDb.updateLoginUser(this.state.email, this.state.password);
            context.setToken(token);
            context.setActivePage("Role");
            context.hideSideBar();
            context.hideLoading();
        }).catch(e => {
            context.showMessage(lang(locale).getLabel("screen.login.message." + e.error)).warn();
            context.hideLoading();
            return;
        });
    }

    handleLocaleChange = (d) => {
        const {context} = this.props;
        //TODO:Set locale to DB
        context.setLocale(d);
    }

    render() {
        const {context} = this.props;
        const {locale} = context;
        const {summary} = this.state;
        const {model} = this.state;
        const {os} = this.state;

        const primaryLocaleStyle = {color: '#FFF', fontSize: 25};
        const secondaryLocaleStyle = {color: '#000', fontSize: 25};

        return (
            <Container style={{paddingTop: 100}}>
                <Header>
                    <Body>
                    <Title>{lang(locale).getLabel("screen.login.title")}</Title>
                    </Body>
                </Header>
                <Form>
                    <FormItem floatingLabel>
                        <Label>{lang(locale).getLabel("input.email")}</Label>
                        <Input onChangeText={(d) => {
                            this.setState({email: d})
                        }} value={this.state.email}/>
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>{lang(locale).getLabel("input.password")}</Label>
                        <Input secureTextEntry={true} onChangeText={(d) => {
                            this.setState({password: d})
                        }} value={this.state.password}/>
                    </FormItem>

                    <View style={{alignItems: 'center', alignSelf: 'center'}}>

                        <MultiToggleSwitch defaultActiveIndex={locale}>
                            <MultiToggleSwitch.Item
                                primaryColor={'#cf0018'}
                                onPress={(d) => this.handleLocaleChange()}>
                                <Text
                                    style={(locale === TURKISH) ? primaryLocaleStyle : secondaryLocaleStyle}>TR</Text>
                            </MultiToggleSwitch.Item>

                            <MultiToggleSwitch.Item
                                primaryColor={'#034acf'}
                                onPress={(d) => this.handleLocaleChange(ENGLISH)}>
                                <Text
                                    style={(locale === ENGLISH) ? primaryLocaleStyle : secondaryLocaleStyle}>EN</Text>
                            </MultiToggleSwitch.Item>
                        </MultiToggleSwitch>

                    </View>

                    <Button full primary style={{paddingBottom: 4}}
                            onPress={() => this.handleLoginClick()}>
                        <Text> {lang(locale).getLabel("button.login")} </Text>
                    </Button>

                    <Separator bordered/>

                    <Button full light primary onPress={() => context.setActivePage("SignUp")}>
                        <Text> {lang(locale).getLabel("button.signup")}</Text>
                    </Button>


                </Form>
            </Container>
        )
    }//render

}
