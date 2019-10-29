import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors,Card, Input,Icon, Button,Header} from 'react-native-elements';
import Database from '../firebase/Database';
import Snackbar from 'react-native-snackbar';
import base64 from 'react-native-base64';
import Spinner from 'react-native-loading-spinner-overlay';

function BackButton(props) {
  return <Icon onPress={() => { props.navigation.navigate('Home') }} name="arrow-back" color="#fff"/>;
}
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      title:'',
      comments:'',
      uid:'',
      loading:false
    };
    this.savePassword = this.savePassword.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  savePassword() {
    // Set Mobile
    this.setState({loading:true});
    if (this.state.uid) {
      var item = {
        email:this.state.email,
        password:base64.encode(this.state.password),
        title:this.state.title,
        comments:this.state.comments
      }
        var res= Database.setPassword(this.state.uid, item);
        console.log(res);
        Snackbar.show({
          title:'Created Successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        this.props.navigation.pop();
    }
    this.setState({loading:false});
  }
  componentDidMount(){
    var i = this.props.navigation.getParam('uid');
    this.setState({uid:i});
    console.log('uid',this.state.uid);
  }
  render() {
    return (
      <>
      <Header
          leftComponent={<BackButton {...this.props} />}
          centerComponent={{ text: 'Details', style: { color: '#fff', fontWeight: 'bold', fontSize:20} }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
            marginTop: -25
          }}
        />
      <View style={styles.container}>
      <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
        />
        <Card title="Add new Password" titleStyle={styles.heading}>
          <Input 
              onSubmitEditing={(event) => { 
                this.refs.email.focus(); 
              }}
              ref='title' autoFocus = {true}
              returnKeyType={ "next" } placeholder='Title' value={this.state.title} onChangeText={title => this.setState({ title })} />
          <Input onSubmitEditing={(event) => { 
                this.refs.password.focus(); 
              }}
              ref='email'
               returnKeyType={ "next" } placeholder='Email' value={this.state.email} onChangeText={email => this.setState({ email })} />
          <Input onSubmitEditing={(event) => { 
                this.refs.comments.focus(); 
              }} 
              ref='password' returnKeyType={ "next" } placeholder='Password' value={this.state.password}  onChangeText={(password) => this.setState({ password })} />
          <Input ref='comments' returnKeyType={ "done" } placeholder='Comment' value={this.state.comments} onChangeText={comments => this.setState({comments})} />
          <Button rounded title="Save" onPress={this.savePassword} />
        </Card>
      </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  center:{
      alignSelf:'center'
  },
  heading:{
      fontSize:18,
      color: colors.primary,
  },
  primary:{
      color:colors.primary,
  },
  container: {
      flex: 1,
      justifyContent:'space-evenly',
      // paddingTop: 12,
      backgroundColor: '#ecf0f1',
      alignItems:'stretch',

  }
});