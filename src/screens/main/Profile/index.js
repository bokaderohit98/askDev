import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import General from './General';
import Education from './Education';
import Experience from './Experience';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            tabs: [
                {
                    key: 'general',
                    title: 'General',
                    icon: 'info-outline'
                },
                {
                    key: 'education',
                    title: 'Education',
                    icon: 'school'
                },
                {
                    key: 'experience',
                    title: 'Experience',
                    icon: 'work'
                }
            ]
        };
    }

    handleIndexChange = index => {
        this.setState({
            activeTabIndex: index
        });
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'general':
                return <General />;
            case 'education':
                return <Education />;
            case 'experience':
                return <Experience />;
            default:
                return <General />;
        }
    };

    render() {
        const { activeTabIndex: index, tabs: routes } = this.state;
        return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={this.handleIndexChange}
                renderScene={this.renderScene}
            />
        );
    }
}

export default Profile;
