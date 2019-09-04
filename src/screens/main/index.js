import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feed from './Feed';
import Developers from './Developers';
import Drawer from './Drawer';

const Main = createDrawerNavigator(
    {
        Feed: {
            screen: Feed
        },
        Developers: {
            screen: Developers
        }
    },
    {
        initialRouteName: 'Feed',
        drawerWidth: 300,
        drawerType: 'slide',
        edgeWidth: 20,
        contentComponent: Drawer
    }
);

export default createAppContainer(Main);
