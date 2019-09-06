import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Avatar, Subheading, Button, TouchableRipple } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
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
        navigation.dispatch(navigateAction);
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
        return (
            <Container>
                <TouchableRipple onPress={() => console.log('profile')}>
                    <ProfileContainer source={drawerBackground} onPress={() => console.log('profile')}>
                        <Avatar.Image
                            source={{
                                uri: 'https://www.sccpre.cat/mypng/detail/55-552688_dale-engen-person-placeholder.png'
                            }}
                        />
                        <Subheading style={styles.Handle}>@Spartan</Subheading>
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

export default Drawer;
