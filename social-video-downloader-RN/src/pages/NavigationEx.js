import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Screen1, Screen2, Screen3} from './src/pages';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* STACK NAVIGATOR  */}
      {/* <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator> */}

      {/* TAB NAVIGATOR  */}
      {/* <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Screen1') {
              iconName = 'autoprefixer';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Screen2') {
              iconName = 'btc';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Screen3') {
              iconName = 'dollar-sign';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        // material top tab & bottom tab
        tabBarOptions={{
          activeTintColor: '#f0f',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: true,
          labelStyle: {fontSize: 14},
          showIcon: true,
        }}
        activeColor="#f0edf6"
        // activeColor="black"
        inactiveColor="#3e2465"
        // inactiveColor="yellow"
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Screen1"
          component={Screen1}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
      </Tab.Navigator> */}

      <Drawer.Navigator
        initialRouteName="Screen2"
        drawerPosition="right"
        // default front
        drawerType="back"
        // semakin besar, di slidenya bsa dari jauh
        edgeWidth={100}
        hideStatusBar={true}
        // overlayColor="#fff"
        overlayColor="#00000090"
        drawerStyle={{
          backgroundColor: '#e6e6e6',
          width: 300,
        }}
        screenOptions={{
          headerShown: true,
          swipeEnabled: false,
          // gestureEnabled: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: 'red',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}>
        <Drawer.Screen
          name="Screen1"
          component={Screen1}
          options={{
            title: 'Screen A Title',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name="autoprefixer"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999999'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Screen2"
          component={Screen2}
          options={{
            title: 'Screen B Title',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name="btc"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999999'}
              />
            ),
          }}
        />
        <Drawer.Screen name="Screen3" component={Screen3} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
