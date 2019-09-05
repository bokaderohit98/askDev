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
            ],
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
                githubusername: 'nikhilgufdasfsdfdsfsdafsadfpta30',
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
                        description: ''
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
        const { profile } = this.state;
        switch (route.key) {
            case 'general':
                return <General profile={profile} />;
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
