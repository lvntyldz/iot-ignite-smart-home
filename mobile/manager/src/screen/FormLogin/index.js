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

export default class Wrapper extends Component {
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

          <Button full primary style={{ paddingBottom: 4 }} onPress={()=>{
            alert("login operation will be here!");
          }}>
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
