import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Right,Badge, Text, Separator } from 'native-base';
export default class Dashboard extends Component {


  render() {
    return (
      <Container>
       <Header />
       <Content>
         <Separator bordered>
           <Text>Gateways</Text>
         </Separator>
         <ListItem>
           <Left>
             <Text>Online</Text>
           </Left>
           <Right>
             <Badge success>
               <Text>1</Text>
             </Badge>
           </Right>
         </ListItem>
         <ListItem>
           <Left>
             <Text>Offline</Text>
           </Left>
           <Right>
             <Badge warning>
               <Text>2</Text>
             </Badge>
           </Right>
         </ListItem>
         <ListItem last>
           <Left>
             <Text>Total</Text>
           </Left>
           <Right>
             <Badge primary>
               <Text>3</Text>
             </Badge>
           </Right>
         </ListItem>

         <Separator bordered>
           <Text>LICENSES</Text>
         </Separator>
         <ListItem>
           <Left>
             <Text>Assigned</Text>
           </Left>
           <Right>
             <Badge success>
               <Text>1</Text>
             </Badge>
           </Right>
         </ListItem>
         <ListItem>
           <Left>
             <Text>Unassigned</Text>
           </Left>
           <Right>
             <Badge warning>
               <Text>2</Text>
             </Badge>
           </Right>
         </ListItem>
         <ListItem last>
           <Left>
             <Text>Total</Text>
           </Left>
           <Right>
             <Badge primary>
               <Text>3</Text>
             </Badge>
           </Right>
         </ListItem>

         <Separator bordered>
           <Text>Gateways Model</Text>
         </Separator>
         <ListItem>
           <Text> RASPBERRYPI </Text>
         </ListItem>
         <ListItem last>
           <Text> SMgG1.2 </Text>
         </ListItem>

         <Separator bordered>
           <Text> OS Version</Text>
         </Separator>
         <ListItem>
           <Text> 7.1.1 </Text>
         </ListItem>
         <ListItem last>
           <Text> 8.1.0 </Text>
         </ListItem>

       </Content>
     </Container>
    );
  }
}
