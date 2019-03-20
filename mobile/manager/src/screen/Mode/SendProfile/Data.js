import React, {Component} from 'react';
import {Button, Container, Content, Icon, Input, Item, Label, Text,} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';
import SideBarNav from 'MgrComponent/SideBarNav';
import {lang} from 'MgrLocale';
import * as profile from "MgrLib/profile/index";


export default class SendProfileData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendProfileDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendProfileDataContext extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rerender: false,
            mode: {
                name: null,
                code: null
            },
            policy: {
                name: null,
                code: null
            }
        }
    }

    componentDidMount = () => {
        const {context} = this.props;
        context.showLoading();

        profile.getData(context.token).then(result => {

            let mode: {}

            result.map((v, k) => {

                if (v.defaultProfile === true) {
                    mode = {
                        name: v.name,
                        code: v.code
                    }
                }
            });

            this.setState({mode})

        }).then((r) => {

            profile.getPolicy(context.token, this.state.mode.code).then((result) => {

                let policy = {
                    name: result.defaultPolicy.name,
                    code: result.defaultPolicy.code
                }

                this.setState({policy})
                context.hideLoading();
            });

        });
    }

    handleSendModeClick = () => {

        const {context} = this.props;
        const {mode} = this.state;
        const {policy} = this.state;
        context.showLoading();

        profile.sendMode(context.token, context.workingset, mode.code, {defaultPolicy: {code: policy.code}}).then((result) => {

            let policy = {
                name: result.defaultPolicy.name,
                code: result.defaultPolicy.code
            }

            this.setState({policy})
            context.hideLoading();
        }).catch(e => {
            context.hideLoading();
        });
    }

    render() {
        const {context} = this.props;
        const {locale} = context;

        return (
            <Container>
                <SideBarNav pageTitle={lang(locale).getLabel("screen.mode.sendProfileTitle")}/>

                <Content style={{marginTop: 20, padding: 4}}>


                    <Item disabled inlineLabel>
                        <Label>{lang(locale).getLabel("screen.mode.label")}</Label>
                        <Input disabled placeholder={this.state.mode.name}/>
                        <Icon name='information-circle'/>
                    </Item>

                    <Item disabled>
                        <Label>{lang(locale).getLabel("screen.mode.policy")}</Label>
                        <Input disabled placeholder={this.state.policy.name}/>
                        <Icon name='information-circle'/>
                    </Item>

                    <Button block style={{marginTop: 20}} onPress={() => this.handleSendModeClick()}>
                        <Text>{lang(locale).getLabel("screen.mode.sendModeBtn")}</Text>
                    </Button>

                </Content>

            </Container>
        );//return
    }//render

}
