// RootStackNavigator.js
import {View, useColorScheme} from 'react-native';
import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from '../redux/Store';
import RootStackNavigatorContent from './RootStackNavigatorContent';

const RootStackNavigator = () => {
  return (
    <Provider store={store}>
      <RootStackNavigatorContent />
    </Provider>
  );
};

export default RootStackNavigator;
