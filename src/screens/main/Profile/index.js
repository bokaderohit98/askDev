import React, { Component } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import General from './General';
import Specific from './Specific';
import tabsSchema from './tabsSchema';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentUser: true,
            activeTabIndex: 0,
            tabs: tabsSchema,
            profile: {
                skills: [
                    'javascript',
                    ' c++',
                    ' java',
                    ' git',
                    ' react',
                    ' android dev'
                ],
                _id: '5cadd837f93a5c00170b5b31',
                user: {
                    _id: '5cadd73af93a5c00170b5b30',
                    name: 'Nikhil Gupta',
                    avatar:
                        'http://www.gravatar.com/avatar/bd7c16d04392f5b9fc0fabdfd134e451?s=200&r=pg&d=mm'
                },
                handle: 'nik',
                website: 'https://devopedia.herokuapp.com',
                location: 'Delhi',
                bio: 'Third year student at N.S.U.T. Gaming and coding rocks',
                status: 'Student',
                githubusername: 'nikhilgupta30',
                experience: [
                    {
                        current: false,
                        _id: '5d448d140c480500171e5c9f',
                        title: 'Software Developer Intern',
                        company: 'MyKaarma India Pvt. Limied',
                        location: 'Delhi',
                        from: '2019-05-20T00:00:00.000Z',
                        to: '2019-07-20T00:00:00.000Z',
                        description: 'Developed Android Application '
                    }
                ],
                education: [
                    {
                        current: true,
                        _id: '5cae2c3ff6973100173fac04',
                        school: 'N.S.U.T.',
                        degree: 'B.E.',
                        fieldofstudy: 'Computer Engineering',
                        from: '2016-08-01T00:00:00.000Z',
                        to: null,
                        description:
                            'Backchodi all around the corner with through emphasis on new techniques to frustrate others'
                    }
                ],
                date: '2019-04-10T11:49:11.077Z',
                __v: 2
            }
        };
    }

    handleIndexChange = index => {
        this.setState({
            activeTabIndex: index
        });
    };

    renderScene = ({ route }) => {
        const { profile, isCurrentUser } = this.state;
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
