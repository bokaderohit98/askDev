import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Avatar, Subheading, Button, TouchableRipple } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import { connect } from 'react-redux';
import drawerBackground from '../../assets/drawerBackground.png';

const Container = styled.View`
    display: flex;
    flex: 1;
`;

const ProfileContainer = styled.ImageBackground`
    height: 150;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavigationItemContainer = styled.ScrollView`
    display: flex;
    flex: 1;
    padding: 16px;
`;

const FooterContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    height: 50;
`;

const styles = StyleSheet.create({
    Handle: {
        color: '#fffffe'
    }
});

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.routes = ['Feed', 'Developers'];
    }

    navigateToScreen = routeName => () => {
        const { navigation } = this.props;
        const navigateAction = NavigationActions.navigate({ routeName });
        navigation.closeDrawer();
        navigation.dispatch(navigateAction);
    };

    navigateToAuthentication = () => {
        const { navigation } = this.props;
        navigation.replace('Authentication');
    };

    navigateToProfile = () => {
        const { navigation } = this.props;
        const { profile } = this.props;
        if (!profile || Object.keys(profile).length === 0) return;
        navigation.closeDrawer();
        navigation.navigate('Profile', { profile, isCurrentUser: true });
    };

    renderNavigationMenu = () => {
        const navigationItems = this.routes.map(route => (
            <Button
                key={route}
                color="#000000"
                onPress={this.navigateToScreen(route)}
                contentStyle={{
                    height: 60,
                    alignSelf: 'flex-start'
                }}
            >
                {route}
            </Button>
        ));

        return <NavigationItemContainer>{navigationItems}</NavigationItemContainer>;
    };

    render() {
        const { user, isAuthenticated, profile } = this.props;
        return (
            <Container>
                <TouchableRipple onPress={this.navigateToProfile}>
                    <ProfileContainer source={drawerBackground}>
                        {isAuthenticated && user && profile && (
                            <>
                                <Avatar.Image source={{ uri: user.avatar }} />
                                <Subheading style={styles.Handle}>{`@ ${profile.handle}`}</Subheading>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Button mode="contained" onPress={this.navigateToAuthentication}>
                                Login
                            </Button>
                        )}
                    </ProfileContainer>
                </TouchableRipple>

                {this.renderNavigationMenu()}
                <FooterContainer>
                    <Subheading>Made for the Community</Subheading>
                    <Avatar.Icon icon="favorite" size={16} style={{ marginLeft: 8 }} />
                </FooterContainer>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    profile: state.profile
});

export default connect(mapStateToProps)(Drawer);
