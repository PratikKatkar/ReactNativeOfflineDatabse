
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import CategoryScreen from '../Home/CategoryScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigatorContent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'HomeStack'}>
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigatorContent;
