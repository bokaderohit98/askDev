import React, { Component } from 'react';
import styled from 'styled-components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Title, Subheading, Chip } from 'react-native-paper';
import { connect } from 'react-redux';
import { Error, Loading, Empty } from '../../../components';
import { fetchDevelopers } from '../../../redux/api';

const Container = styled.View`
    display: flex;
    flex: 1;
`;

const MainContainer = styled.ScrollView`
    display: flex;
    flex: 1;
    background-color: #ffffff;
    padding: 12px;
`;

const SkillsContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px;
`;

const styles = StyleSheet.create({
    DeveloperCard: {
        borderBottomColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderRadius: 0,
        marginBottom: 50
    },
    CardAction: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    SkillChip: {
        margin: 4
    }
});

class Developers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developers: [],
            loading: false,
            developersError: {},
            profile: {}
        };
    }

    componentDidMount() {
        const { fetchDevelopers } = this.props;
        fetchDevelopers();
    }

    static getDerivedStateFromProps(props, state) {
        const { developers, loading, developersError, profile } = props;
        return {
            ...state,
            developers,
            loading,
            developersError,
            profile
        };
    }

    navigateToProfile = _id => () => {
        const { developers, profile } = this.state;
        const { navigation } = this.props;
        const developerProfile = developers.find(developer => developer._id === _id);
        navigation.navigate('Profile', { profile: developerProfile, isCurrentUser: profile._id === _id });
    };

    renderDeveloperSkills = skills => {
        const chips = skills.map(skill => (
            <Chip key={skill} style={styles.SkillChip}>
                {skill}
            </Chip>
        ));
        return <SkillsContainer>{chips}</SkillsContainer>;
    };

    renderDevelopers = () => {
        const { developers } = this.state;
        return developers.map(developer => {
            let company = '';
            if (developer.company && developer.company.length > 0) company = `at ${developer.company}`;
            return (
                <Card style={styles.DeveloperCard} key={developer.user._id}>
                    <Card.Title
                        title={developer.user.name}
                        subtitle={`@${developer.handle}`}
                        left={props => <Avatar.Image {...props} source={{ uri: `${developer.user.avatar}` }} />}
                    />
                    <Card.Content>
                        <Title>{`${developer.status} ${company}`}</Title>
                        {developer.location && developer.location.length > 0 && (
                            <Subheading>{`Lives in ${developer.location}`}</Subheading>
                        )}
                        {this.renderDeveloperSkills(developer.skills)}
                    </Card.Content>
                    <Card.Actions style={styles.CardAction}>
                        <IconButton
                            icon="arrow-forward"
                            onPress={this.navigateToProfile(developer._id)}
                            color="#673ab7"
                        />
                    </Card.Actions>
                </Card>
            );
        });
    };

    render() {
        const { loading, developers, developersError, profile } = this.state;
        const { error } = developersError;
        return (
            <Container>
                {loading && <Loading />}
                {!loading && error && <Error />}
                {!loading && !error && developers && developers.length === 0 && <Empty>No Developers Present!</Empty>}
                {!loading && !error && developers && developers.length > 0 && profile && (
                    <MainContainer>{this.renderDevelopers()}</MainContainer>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.developersLoading,
    developers: state.developers,
    developersError: {
        error: state.developersError,
        message: state.developersErrorMessage
    },
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { fetchDevelopers }
)(Developers);
