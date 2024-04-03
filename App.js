import {View, Text} from 'react-native';
import React from 'react';
import store from './src/redux/Store';
import {Provider} from 'react-redux';
import RootStackNavigatorContent from './src/Navigation/RootStackNavigatorContent';

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigatorContent />
    </Provider>
  );
};

export default App;
