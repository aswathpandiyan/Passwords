import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Header, Button, Icon, Card, ListItem, colors } from 'react-native-elements';
//import SimpleCrypto from "simple-crypto-js";
//import CryptoJS from 'crypto-js';
import base64 from 'react-native-base64';
const secret = 'this-is-secret-07';
import Storage from '../storage/LocalStorage';
function BackButton(props) {
  return <Icon onPress={() => { props.navigation.navigate('Home') }} name="arrow-back" color="#fff"/>;
}

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      icon:'eye-slash',
      show_password:true,
      temp_password:'',
    };
    this.togglePassword=this.togglePassword.bind(this);
  }
  togglePassword(){
    var ic = (this.state.icon=='eye')?'eye-slash':'eye';
    if(this.state.show_password){
      //show original
      this.setState({show_password:false,temp_password:this.state.item.dec_password});
    }else{
      //hide password
      this.setState({show_password:true,temp_password:this.state.item.password});
    } 
    this.setState({icon:ic});
  }
  
  static navigationOptions = {
    header: null
  }
componentDidMount(){
  var i = this.props.navigation.getParam('param');
    //i.password = base64.encode(i.password);
    console.log('param receive with data :',i);
    i.dec_password = base64.decode(i.password);
    //console.log('after decode the data:',i);
    this.setState({item:i,show_password:true,temp_password:i.password});
   var pas= Storage.getPasswords(Storage.getUserId());
   console.log('/888888888888888888888/');
   console.log(pas);
   console.log('/888888888888888888888/');
    
}
componentWillUnmount(){
  this.setState({item:{}});
}
  render() {
   // Storage.getPasswords();
    return (
      <>
        <Header
          leftComponent={<BackButton {...this.props} />}
          centerComponent={{ text: 'Details', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
            marginTop: -25
          }}
        />
        <Card>
          <ListItem
            title='Title'
            subtitle={this.state.item.title}
            bottomDivider
          //onPress={() => { this.props.navigation.navigate('Details')}}
          />
          <ListItem
            title='Email'
            subtitle={this.state.item.email}
            bottomDivider
          //onPress={() => { this.props.navigation.navigate('Details')}}
          />
          <ListItem
            title='Password'
            subtitle={this.state.temp_password}
            bottomDivider
            //switch={{onValueChange={togglePassword}}}
            onPress = {this.togglePassword}
            rightElement={<Icon containerStyle={{ alignSelf: 'center', }} type="font-awesome" color="#C8C8C8" name={this.state.icon} />}
          />
          <ListItem
            title='Comment'
            subtitle={this.state.item.comments}
          //onPress={() => { this.props.navigation.navigate('Details')}}
          />
        </Card>
      </>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'

  }
});
export default Details;
