import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Title} from 'native-base';
//custom
import {CtxConsumer} from 'MgrBoot/Container';

export default class ListHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rerender: false
        }
    }

    render() {
        return (
            <CtxConsumer>
                {(context) => {
                    return (
                        <Container>
                            <Header>
                                <Body>
                                <Title>ListHeader</Title>
                                </Body>
                                <Left/>
                                <Right>
                                    <Button onPress={() => context.showSideBar()} iconLeft light>
                                        <Icon name='list'/>
                                    </Button>
                                </Right>
                            </Header>

                            <Content>

                                <List>
                                    <ListItem itemHeader first>
                                        <Text>COMEDY</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Hangover</Text>
                                    </ListItem>
                                    <ListItem last>
                                        <Text>Cop Out</Text>
                                    </ListItem>
                                    <ListItem itemHeader>
                                        <Text>ACTION</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Terminator Genesis</Text>
                                    </ListItem>
                                </List>

                            </Content>
                        </Container>
                    )
                }

                }
            </CtxConsumer>
        );
    }
}