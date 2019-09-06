import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
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
        const { navigation, profile: currentProfile } = props;
        const isCurrentUser = navigation.getParam('isCurrentUser', false);
        const developerProfile = navigation.getParam('profile');
        return {
            ...state,
            isCurrentUser,
            profile: isCurrentUser ? currentProfile : developerProfile
        };
    }

    handleIndexChange = index => {
        this.setState({
            activeTabIndex: index
        });
    };

    navigateToEditScreen = () => {
        const { profile } = this.state;
        const { navigation } = this.props;
        navigation.navigate('CreateProfile', { profile, type: 'edit' });
    };

    renderScene = ({ route }) => {
        const { profile, isCurrentUser } = this.state;
        switch (route.key) {
            case 'general':
                return (
                    <General
                        profile={profile}
                        isCurrentUser={isCurrentUser}
                        navigateToEditScreen={this.navigateToEditScreen}
                    />
                );
            case 'education':
                return <Specific profile={profile} type="education" isCurrentUser={isCurrentUser} />;
            case 'experience':
                return <Specific profile={profile} type="experience" isCurrentUser={isCurrentUser} />;
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

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(Profile);
