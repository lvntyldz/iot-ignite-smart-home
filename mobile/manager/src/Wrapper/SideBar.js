import React, {Component} from 'react';

import {
    Body,
    Button,
    Container,
    Content,
    Footer,
    Header,
    Icon,
    Left,
    ListItem,
    Right,
    Subtitle,
    Text,
    Title
} from 'native-base';

import {CtxConsumer} from 'MgrBoot/Container';

export default class SideBar extends Component {

    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return (
                        <Container>
                            <Header>
                                <Left>
                                    <Button onPress={() => context.hideSideBar()} iconLeft light>
                                        <Icon name='arrow-back'/>
                                    </Button>
                                </Left>
                                <Body>
                                <Title>Menu</Title>
                                <Subtitle>...</Subtitle>
                                </Body>
                                <Right/>
                            </Header>

                            <Content>

                                <ListItem icon>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("Dashboard")}
                                                style={{backgroundColor: "#FF9501"}}>
                                            <Icon active name="pie"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>Dashboard</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("DeviceList")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="phone-portrait"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>DeviceList</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon>
                                    <Left>
                                        <Button onPress={() => context.changeScreenByType("ListHeader")}
                                                style={{backgroundColor: "#007AFF"}}>
                                            <Icon active name="person"/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text>ListHeader</Text>
                                    </Body>
                                </ListItem>

                            </Content>

                            <Footer style={{bottom: 10}}>
                                <Left>
                                    <Button iconLeft transparent danger onPress={() => context.logut()}>
                                        <Icon active name="ios-log-out"/>
                                        <Text>Logout</Text>
                                    </Button>
                                </Left>
                                <Right/>
                            </Footer>


                        </Container>
                    )
                }

                }
            </CtxConsumer>
        );
    }
}