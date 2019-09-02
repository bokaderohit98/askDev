import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Authentication from './screens/authentication';

const App = createStackNavigator(
    {
        Authentication: {
            screen: Authentication
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
