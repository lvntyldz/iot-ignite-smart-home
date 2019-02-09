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
import * as tokenDb from 'MgrLib/db/token';
import * as userDb from 'MgrLib/db/user';
import { CtxProvider, CtxConsumer } from 'MgrBoot/Container';

export default class Wrapper extends Component {
  constructor(props) {
       super(props)
       this.state = {
         email:null,
         password:null
       }
   }

   componentWillMount = ()=>{
     userDb.getLastRemembered().then(r=>{
       if(!r){
         return;
       }
        this.setState({email:r.email,password:r.password});
     });
   }

  handleLoginClick = (context) => {

    login.loginToCloud(this.state.email, this.state.password).then(token => {
      tokenDb.addToken(token);
      userDb.updateLoginUser(this.state.email, this.state.password);
      context.setToken(token);
      context.setActivePage("Dashboard");
    });
  }
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
        <Input onChangeText={(d)=>{this.setState({email:d})}} value={this.state.email}  />
      </FormItem>
      <FormItem floatingLabel last>
        <Label>Password</Label>
        <Input secureTextEntry={true} onChangeText={(d)=>{this.setState({password:d})}} value={this.state.password}  />
      </FormItem>

      <Button full primary style={{ paddingBottom: 4 }} onPress={(c)=>this.handleLoginClick(context)}>
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
