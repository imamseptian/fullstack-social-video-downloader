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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Youtube, Twitter, Tiktok, DownloadScreen} from './src/pages';

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    // <DownloadScreen />
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Youtube"
        drawerStyle={{
          backgroundColor: '#474b4f',
          width: 300,
        }}
        drawerContentOptions={{
          labelStyle: {
            fontSize: 13,
            // color: '#86C232',
            fontWeight: 'bold',
          },
          activeTintColor: '#000',
          inactiveTintColor: '#86C232',
          activeBackgroundColor: 'rgba(255,255,255,0.3)',
        }}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#222629',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}>
        <Drawer.Screen
          name="Youtube"
          component={Youtube}
          options={{
            title: 'Youtube Video Downloader',
            drawerIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="youtube"
                size={focused ? 25 : 20}
                color={focused ? 'red' : '#fff'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Twitter"
          component={Twitter}
          options={{
            title: 'Twitter Video Downloader',
            drawerIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="twitter"
                size={focused ? 25 : 20}
                color={focused ? '#1da1f2' : '#fff'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Tiktok"
          component={Tiktok}
          options={{
            title: 'TikTok Video Downloader',
            drawerIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="music-note"
                size={focused ? 25 : 20}
                color={focused ? '#000' : '#fff'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
