import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DrawerActions } from 'react-navigation-drawer';
import { IconButton } from 'react-native-paper';
import React from 'react';
import Authentication from './screens/authentication';
import CreateProfile from './screens/createProfile';
import Main from './screens/main';

const App = createStackNavigator(
    {
        Authentication: {
            screen: Authentication
        },
        CreateProfile: {
            screen: CreateProfile
        },
        Main: {
            screen: Main,
            navigationOptions: {
                headerStyle: {
                    display: 'flex',
                    backgroundColor: '#673ab7'
                }
            }
        }
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                display: 'none'
            }
        }
    }
);

export default createAppContainer(App);
