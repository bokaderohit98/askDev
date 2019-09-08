import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Create from './Create';
import Posts from './Posts';
import { fetchPosts } from '../../../redux/api';
import AuthService from '../../../utils/authService';

const Container = styled.View`
    display: flex;
    flex: 1;
    background: #eeeeee;
`;

class Feed extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    componentDidMount() {
        const { fetchPosts } = this.props;
        this.authService.makeSecureRequest(fetchPosts);
    }

    render() {
        const { posts, user } = this.props;
        return (
            <Container>
                <Create />
                <Posts {...posts} user={user} />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    posts: {
        posts: state.posts,
        loading: state.postsLoading,
        error: state.postsError,
        message: state.postsErrorMessage
    },
    user: state.user
});

export default connect(
    mapStateToProps,
    { fetchPosts }
)(Feed);
