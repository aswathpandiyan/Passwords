/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {  StyleSheet} from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import LoginForm from './src/components/LoginForm';
import Home from './src/components/Home';
import Details from './src/components/Details';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Create from './src/components/Create';
import { StoreProvider, createStore, useStore, useAction } from 'easy-peasy';
import model from './src/model/index';

// 👇 firstly, create your store by providing your model
const store = createStore(model);
const MainNavigator = createStackNavigator({
  Login: {screen: LoginForm},
  Home: {screen: Home},
  Details:{screen:Details},
  Create:{screen:Create}
});

const Root = createAppContainer(MainNavigator);

const theme = {
  Button: {
    containerStyle: {
      marginTop: 12
    }
  },
};

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Root/>
      </StoreProvider>
  </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
