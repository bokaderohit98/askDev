import React, { Component } from 'react';
import styled from 'styled-components';
import { View, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Subheading,
    DataTable,
    Chip,
    IconButton
} from 'react-native-paper';
import axios from 'axios';
import { DoubleBounce } from 'react-native-loader';
import HeaderImage from '../../../assets/drawerBackground.png';
import routes from '../../../utils/routes';

const Container = styled.View`
    display: flex;
    flex: 1;
`;

const HeaderContainer = styled.ImageBackground`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
`;

const EditContainer = styled.View`
    display: flex;
    align-self: flex-end;
    flex-direction: row-reverse;
    padding: 8px;
`;

const MainContainer = styled.ScrollView`
    display: flex;
    flex: 1;
`;

const ContentContainer = styled.View`
    padding: 16px;
    border-bottom-color: #cccccc;
    border-bottom-width: 1;
    background-color: #ffffff;
    margin-bottom: 24px;
`;

const SkillContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const LoaderContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RepoContainer = styled.View`
    display: flex;
    margin-bottom: 20px;
    border-bottom-color: #cccccc;
    border-bottom-width: 1;
`;

const RepoTagsContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;
`;

const TableRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
`;

const styles = StyleSheet.create({
    RowItem: {
        marginRight: 32
    },
    Chip: {
        margin: 4
    },
    Forks: {
        color: '#ffffff',
        backgroundColor: '#4CAF50',
        marginRight: 4,
        borderRadius: 2
    },
    Watchers: {
        color: '#ffffff',
        backgroundColor: '#A1887F',
        marginRight: 4,
        borderRadius: 2
    },
    Stars: {
        color: '#ffffff',
        backgroundColor: '#2196F3',
        marginRight: 4,
        borderRadius: 2
    }
});

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            isCurrentUser: false,
            clientId: 'f79e158eb0998c15fd60',
            clientSecret: '5b20d78a85c5c943061dcc6625b648a913b20d6a',
            github: {
                loading: false,
                repos: [],
                error: false,
                errorMessage: ''
            }
        };
    }

    componentDidMount() {
        this.fetchGithubRepos();
    }

    static getDerivedStateFromProps(props, state) {
        const { profile, isCurrentUser } = props;
        return {
            ...state,
            profile,
            isCurrentUser
        };
    }

    componentDidUpdate(prevProps, PrevState) {
        const { profile } = this.state;
        if (PrevState.profile && PrevState.profile._id !== profile._id)
            this.fetchGithubRepos();
    }

    fetchGithubRepos = () => {
        const { github, profile, clientId, clientSecret } = this.state;
        if (!profile.githubusername || profile.githubusername.length === 0) {
            this.setState({
                github: {
                    error: true,
                    repos: []
                }
            });
            return;
        }
        this.setState({
            github: {
                ...github,
                loading: true
            }
        });
        axios
            .get(routes.fetchGithubRepos(profile.githubusername), {
                params: {
                    per_page: 5,
                    sort: 'created: asc',
                    client_id: clientId,
                    client_secret: clientSecret
                }
            })
            .then(res => {
                this.setState({
                    github: {
                        ...github,
                        loading: false,
                        error: false,
                        repos: res.data
                    }
                });
            })
            .catch(err => {
                this.setState({
                    github: {
                        ...github,
                        loading: false,
                        error: true,
                        repos: []
                    }
                });
            });
    };

    renderHeader = () => {
        const { profile, isCurrentUser } = this.state;
        return (
            <HeaderContainer source={HeaderImage}>
                {!isCurrentUser && (
                    <EditContainer>
                        <IconButton
                            icon="edit"
                            color="#ffffff"
                            size={18}
                            onPress={() => console.log('Setting')}
                        />
                    </EditContainer>
                )}
                <Avatar.Image size={80} source={{ uri: profile.user.avatar }} />
                <Title>{profile.user.name}</Title>
                <Subheading>{`@${profile.handle}`}</Subheading>
            </HeaderContainer>
        );
    };

    renderInfo = () => {
        const { profile } = this.state;
        return (
            <>
                {profile.bio && profile.bio.length > 0 && (
                    <ContentContainer>
                        <Subheading style={{ color: '#0000ff' }}>
                            {profile.bio}
                        </Subheading>
                    </ContentContainer>
                )}
                <ContentContainer>
                    <DataTable>
                        {profile.website && profile.website.length > 0 && (
                            <TableRow>
                                <Avatar.Icon
                                    icon="http"
                                    size={24}
                                    style={styles.RowItem}
                                />
                                <DataTable.Cell>
                                    {profile.website}
                                </DataTable.Cell>
                            </TableRow>
                        )}
                        <TableRow>
                            <Avatar.Icon
                                icon="work"
                                size={24}
                                style={styles.RowItem}
                            />
                            <DataTable.Cell>{profile.status}</DataTable.Cell>
                        </TableRow>
                        {profile.location && profile.location.length > 0 && (
                            <TableRow>
                                <Avatar.Icon
                                    icon="location-city"
                                    size={24}
                                    style={styles.RowItem}
                                />
                                <DataTable.Cell>
                                    {profile.location}
                                </DataTable.Cell>
                            </TableRow>
                        )}
                    </DataTable>
                </ContentContainer>
            </>
        );
    };

    renderSkills = () => {
        const { profile } = this.state;
        const skills = profile.skills.map(skill => (
            <Chip key={skill} style={styles.Chip}>
                {skill}
            </Chip>
        ));
        return (
            <ContentContainer>
                <Title style={{ marginBottom: 12 }}>Skills</Title>
                <SkillContainer>{skills}</SkillContainer>
            </ContentContainer>
        );
    };

    renderGithubRepos = () => {
        const { github } = this.state;
        const { loading, repos, error } = github;
        if (loading)
            return (
                <ContentContainer>
                    <LoaderContainer>
                        <DoubleBounce size={24} color="0000ff" />
                    </LoaderContainer>
                </ContentContainer>
            );
        if (!loading && !error && repos && repos.length > 0) {
            const reposUI = repos.map(repo => (
                <RepoContainer key={repo.name}>
                    <Title>{repo.name}</Title>
                    {repo.description && (
                        <Subheading>{repo.description}</Subheading>
                    )}
                    <RepoTagsContainer>
                        <Chip
                            style={styles.Stars}
                        >{`Stars ${repo.stargazers_count}`}</Chip>
                        <Chip
                            style={styles.Forks}
                        >{`Forks ${repo.forks_count}`}</Chip>
                        <Chip
                            style={styles.Watchers}
                        >{`Watchers ${repo.watchers_count}`}</Chip>
                    </RepoTagsContainer>
                </RepoContainer>
            ));
            return (
                <>
                    <ContentContainer style={{ marginBottom: 3 }}>
                        <Title>Latest Github Repositories</Title>
                    </ContentContainer>
                    <ContentContainer style={{ marginBottom: 0 }}>
                        {reposUI}
                    </ContentContainer>
                </>
            );
        }
        return null;
    };

    render() {
        return (
            <Container>
                {this.renderHeader()}
                <MainContainer>
                    {this.renderInfo()}
                    {this.renderSkills()}
                    {this.renderGithubRepos()}
                </MainContainer>
            </Container>
        );
    }
}

export default General;
