import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator ,AsyncStorage} from 'react-native';
import { ListItem, Header, Icon , colors,Card,Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as firebase from "firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from 'react-native-snackbar';
import Storage from '../storage/LocalStorage';

function Logout(props) {
  return <Icon onPress={props.onPress} name="power-off" iconStyle={{marginRight:10,}} size={20} type='font-awesome' color="#fff" />;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      docs: [],
      loading: false
    };
    this.logout = this.logout.bind(this);
  }
  
  async logout() {
    try {
      await firebase.auth().signOut();
      console.log("Logout successful");
      //Storage.removeAll();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error.toString())
    }
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    this.setState({ loading: true });
    try {
      // Get User Credentials
      let user = firebase.auth().currentUser;
      this.setState({
        uid: user.uid
      });
      Storage.setUserId(user.uid);
      //console.log('user',user.uid);
      var db = firebase.app().firestore();
      var data = [];
      db.collection(user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        });
        console.log('docs', data);
        this.setState({ docs: data });
        Storage.setPasswords(user.uid,data);
      });

    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }
  render() {
    //console.log(this.state.docs);
    var uid = Storage.getUserId();
    console.log('userid');
    return (
      <>
        <Header
          centerComponent={{ text: 'Passwords', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
            marginTop: -25
          }}
          rightComponent={<Logout {...this.props} onPress={this.logout} />}
        />
        <Spinner
          visible={this.state.loading}
        />
        {
          this.state.loading && <ActivityIndicator />
        }

        <ScrollView>
          {
            this.state.docs && this.state.docs.map((l, i) => (
              <ListItem
                key={i}
                //   leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.title}
                subtitle={l.email}
                bottomDivider
                onPress={() => { this.props.navigation.navigate('Details', { param: l }) }}
              />
            ))

          }
          {
            this.state.docs.length == 0 && <Button type="clear"
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='No data found' />
            //<Card title="No data found" titleStyle={styles.heading}/>
          }
        </ScrollView>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { this.props.navigation.navigate('Create', { uid: this.state.uid }) }}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  TouchableOpacityStyle: {

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // paddingTop: 12,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',

  },
  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 50,
    height: 50,
  },heading: {
    fontSize: 18,
    color: colors.primary,
},
});
export default Home;
