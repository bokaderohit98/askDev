import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
            screen: Main
        }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none'
    }
);

export default createAppContainer(App);
