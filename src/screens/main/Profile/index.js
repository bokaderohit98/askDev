import React, { Component } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import General from './General';
import Specific from './Specific';
import tabsSchema from './tabsSchema';
import Loading from '../../../components/Loading';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentUser: false,
            activeTabIndex: 0,
            tabs: tabsSchema,
            profile: {}
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { navigation } = props;
        const profile = navigation.getParam('profile');
        return {
            ...state,
            profile
        };
    }

    handleIndexChange = index => {
        this.setState({
            activeTabIndex: index
        });
    };

    renderScene = ({ route }) => {
        const { profile, isCurrentUser } = this.state;
        console.log(profile);
        switch (route.key) {
            case 'general':
                return (
                    <General profile={profile} isCurrentUser={isCurrentUser} />
                );
            case 'education':
                return (
                    <Specific
                        profile={profile}
                        type="education"
                        isCurrentUser={isCurrentUser}
                    />
                );
            case 'experience':
                return (
                    <Specific
                        profile={profile}
                        type="experience"
                        isCurrentUser={isCurrentUser}
                    />
                );
            default:
                return <General isCurrentUser={isCurrentUser} />;
        }
    };

    render() {
        const { activeTabIndex: index, tabs: routes, profile } = this.state;
        return (
            <>
                {Object.keys(profile).length === 0 && <Loading />}
                {Object.keys(profile).length !== 0 && (
                    <BottomNavigation
                        navigationState={{ index, routes }}
                        onIndexChange={this.handleIndexChange}
                        renderScene={this.renderScene}
                    />
                )}
            </>
        );
    }
}

export default Profile;
