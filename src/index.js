import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Authentication from './screens/authentication';
import CreateProfile from './screens/createProfile';

const App = createStackNavigator(
    {
        Authentication: {
            screen: Authentication
        },
        CreateProfile: {
            screen: CreateProfile
        }
    },
    {
        initialRouteName: 'Authentication',
        defaultNavigationOptions: {
            headerStyle: {
                display: 'none'
            }
        }
    }
);

export default createAppContainer(App);
