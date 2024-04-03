import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import SettingScreen from '../SettingScreen';
import Icon from 'react-native-vector-icons/Entypo';
import {Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const [isOnline, setIsOnline] = useState(undefined);
  const [showBackOnline, setShowBackOnline] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
      if (!initialCheckDone) {
        setInitialCheckDone(true);
        if (state.isConnected) {
          setShowBackOnline(false);
        }
      } else {
        if (state.isConnected) {
          setShowBackOnline(true);
          setTimeout(() => {
            setShowBackOnline(false);
          }, 2000);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [initialCheckDone]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'message' : 'message';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
      <View>
        {isOnline ? (
          showBackOnline && (
            <Text style={{textAlign: 'center', backgroundColor: '#3ff032'}}>
              Back online
            </Text>
          )
        ) : (
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: 'gray',
              color: '#fff',
            }}>
            No connection
          </Text>
        )}
      </View>
    </>
  );
};

export default HomeStack;
