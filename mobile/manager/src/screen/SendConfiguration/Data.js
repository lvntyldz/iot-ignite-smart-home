import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Right,
    Text,
    Title,
} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';
import * as profile from "MgrLib/profile";


export default class SendConfigurationData extends Component {
    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return <SendConfigurationDataContext context={context}/>;
                }}
            </CtxConsumer>
        );//return
    }//render
}

export class SendConfigurationDataContext extends Component {
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
        });
    }

    render() {
        const {context} = this.props;
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Send Mode And Policy</Title>
                    </Body>
                    <Left/>
                    <Right>
                        <Button onPress={() => context.showSideBar()} iconLeft light>
                            <Icon name='list'/>
                        </Button>
                    </Right>
                </Header>

                <Content style={{marginTop: 20, padding: 4}}>


                    <Item disabled inlineLabel>
                        <Label>Mode</Label>
                        <Input disabled placeholder={this.state.mode.name}/>
                        <Icon name='information-circle'/>
                    </Item>

                    <Item disabled>
                        <Label>Policy</Label>
                        <Input disabled placeholder={this.state.policy.name}/>
                        <Icon name='information-circle'/>
                    </Item>

                    <Button block style={{marginTop: 20}} onPress={() => this.handleSendModeClick()}>
                        <Text>Send Mode And Policy</Text>
                    </Button>

                </Content>

            </Container>
        );//return
    }//render

}
