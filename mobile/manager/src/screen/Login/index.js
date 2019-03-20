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
//custom
import {lang} from 'MgrLocale';
import {ENGLISH, TURKISH} from 'MgrEnum/Locale';
import * as login from 'MgrLib/login';
import * as tokenDb from 'MgrLib/db/token';
import * as userDb from 'MgrLib/db/user';
import {CtxConsumer} from 'MgrBoot/Container';

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
            email: null,
            password: null
        }
    }

    componentWillMount = () => {
        userDb.getLastRemembered().then(r => {
            if (!r) {
                return;
            }

            //TODO:Remove
            //this.setState({email: r.email, password: r.password});
            this.setState({email: "zxfvttxf@sharklasers.com", password: r.password});
        });
    }

    handleLoginClick = (context) => {

        context.showLoading();
        login.loginToCloud(this.state.email, this.state.password).then(token => {
            tokenDb.addToken(token);
            userDb.updateLoginUser(this.state.email, this.state.password);
            context.setToken(token);
            context.setActivePage("Role");
            context.hideSideBar();
            context.hideLoading();
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
                    <Title>{lang(locale).getLabel("screen.login")}</Title>
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
                            onPress={(c) => this.handleLoginClick(context)}>
                        <Text> {lang(locale).getLabel("button.login")} </Text>
                    </Button>

                    <Separator bordered/>

                    <Button full light primary onPress={context.decrease}>
                        <Text> {lang(locale).getLabel("button.signup")}</Text>
                    </Button>


                </Form>
            </Container>
        )
    }//render

}
