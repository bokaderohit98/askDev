import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './Home';

const Main = createDrawerNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
        drawerWidth: 300,
        drawerType: 'slide',
        edgeWidth: 20
    }
);

export default createAppContainer(Main);
