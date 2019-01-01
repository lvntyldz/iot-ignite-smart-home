import React, { Component } from 'react';
import {
  Separator,
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
} from 'native-base';

//custom
import * as login from 'MgrLib/login';

export default class Wrapper extends Component {

_handleLoginClick = () => {
  login.loginToCloud("<API_USERNAME>","<API_PASSWORD>");
}

  render() {
    return (
      <Container style={{ paddingTop: 100 }}>
        <Header>
          <Body>
            <Title>Login Smart Home Manager</Title>
          </Body>
        </Header>
        <Form>
          <FormItem floatingLabel>
            <Label>Email</Label>
            <Input />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Password</Label>
            <Input secureTextEntry={true} />
          </FormItem>

          <Button full primary style={{ paddingBottom: 4 }} onPress={this._handleLoginClick}>
            <Text> Login </Text>
          </Button>

          <Separator bordered />

          <Button full light primary>
          <Text> Sign Up </Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
