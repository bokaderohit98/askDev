import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

const AuthenticationStack = createStackNavigator(
    {
        Register: {
            screen: RegisterScreen
        },
        Login: {
            screen: LoginScreen
        }
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerStyle: {
                display: 'none'
            }
        }
    }
);

export default createAppContainer(AuthenticationStack);
