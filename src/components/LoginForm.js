import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, PricingCard, Card, Input, Button, ThemeProvider, colors, Toast } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";
import Snackbar from 'react-native-snackbar';

import Spinner from 'react-native-loading-spinner-overlay';
import Storage from '../storage/LocalStorage';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'aswathpandiyan@gmail.com',
            password: 'diehardaswath07',
            loading: false,
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyAAWVpimA6RqjeUrPPimARJySJHUW1Skng",
            authDomain: "mypasswords-2019.firebaseapp.com",
            databaseURL: "https://mypasswords-2019.firebaseio.com",
            projectId: "mypasswords-2019",
            storageBucket: "mypasswords-2019.appspot.com",
            messagingSenderId: "525638205033",
            appId: "1:525638205033:web:6f4fa873feb6918ec12cf8",
            measurementId: "G-Q258HCEHDC"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }
        this.setState({ loading: false });
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    async login() {
        this.setState({ loading: true });
        try {
            console.log(this.state.email, this.state.password);
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log("Logged In!");
            // Navigate to the Home page
            this.props.navigation.navigate('Home');

        } catch (error) {
            console.log(error.toString())
        }
        this.setState({ loading: false });
    }
     register() {
        this.setState({ loading: true });
            console.log(this.state.email, this.state.password);
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(value) {
                console.log(value);
                console.log("Account created");
                    Snackbar.show({
                        title: 'Registered Successfully',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }).catch(function(error) {
                    console.log(error);
                    Snackbar.show({
                        title: error.message,
                        duration: Snackbar.LENGTH_SHORT,
                    });
                });
        this.setState({ loading: false });
    }
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={this.state.loading}
                />
                <Card title="Passwords" titleStyle={styles.heading}>
                    <Input
                        onSubmitEditing={(event) => {
                            this.refs.password.focus();
                        }} 
                        ref='email' returnKeyType={"next"} placeholder='Email' value={this.state.email} onChangeText={email => this.setState({ email })} />
                    <Input ref='password' returnKeyType={"done"} placeholder='Password' value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                    <Button rounded title="Login" onPress={this.login} />
                    <Text style={[styles.center, styles.primary]}>or</Text>
                    <Button title="Register" type="outline" onPress={this.register} />
                </Card>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    center: {
        alignSelf: 'center'
    },
    heading: {
        fontSize: 18,
        color: colors.primary,
    },
    primary: {
        color: colors.primary,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        // paddingTop: 12,
        backgroundColor: '#ecf0f1',
        alignItems: 'stretch',

    }
});