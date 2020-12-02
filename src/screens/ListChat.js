import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from 'native-base';
import {View, Text} from 'react-native';

import avatar from '../assets/img/avatar.png';
import Null from '../assets/img/bgChatNull.svg';
class ListChat extends Component {
  render() {
    return (
      <Container>
        <View style={{marginLeft: 16, marginBottom: 37, marginTop: 70}}>
          <Text
            style={{
              fontSize: 16,
              color: '#9EA0A5',
              fontWeight: '600',
            }}>
            Utama
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Null />
        </View>
        {/* <Content> */}
        {/* <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={avatar} />
              </Left>
              <Body>
                <Text style={{fontSize: 16, fontWeight: '600'}}> OJekmang</Text>
                <Text note style={{fontSize:14,color:'#9EA0A5'}}>hallloooooooo</Text>
              </Body>
              <Right>
                <Text note style={{fontSize:14,color:'#9EA0A5'}}>3:43 pm</Text>
              </Right>
            </ListItem>
          </List> */}

        {/* </Content> */}
      </Container>
    );
  }
}

export default ListChat;
