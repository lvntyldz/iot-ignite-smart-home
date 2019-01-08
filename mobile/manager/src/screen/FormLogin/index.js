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
import * as db from 'MgrLib/db';
import * as tokenDb from 'MgrLib/db/token';
import { CtxProvider, CtxConsumer } from 'MgrBoot/Container';

export default class Wrapper extends Component {

  render() {
    return (
<CtxConsumer>
{(context) =>{
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
        login.loginToCloud("<API_USERNAME>", "<API_PASSWORD>").then(token=>{
          context.setToken(token);
          db.createScripts();
          tokenDb.addToken(token);
          tokenDb.listTokens();
        });
      }}>
        <Text> Login </Text>
      </Button>

      <Separator bordered />

      <Button full light primary onPress={context.decrease} >
      <Text> Sign Up </Text>
      </Button>
    </Form>
  </Container>

  )
}

}
</CtxConsumer>
          );
  }
}
