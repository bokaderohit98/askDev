import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Create from './Create';
import Posts from './Posts';
import { fetchPosts } from '../../../redux/api';
import AuthService from '../../../utils/authService';
import { Toast } from '../../../components';
import axios from '../../../utils/axios';
import routes from '../../../utils/routes';

const Container = styled.View`
    display: flex;
    flex: 1;
    background: #eeeeee;
`;

class Feed extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            post: {
                value: '',
                error: '',
                message: ''
            }
        };
    }

    componentDidMount() {
        const { fetchPosts } = this.props;
        this.authService.makeSecureRequest(fetchPosts);
    }

    handleInputChange = value => {
        this.setState({
            post: {
                value,
                error: false,
                message: ''
            }
        });
    };

    savePost = jwt => {
        const { post } = this.state;
        const { user, fetchPosts } = this.props;

        if (post.value.trim() === '') {
            this.setState({
                post: {
                    value: '',
                    loading: false,
                    error: true,
                    message: `Post can't be empty`
                }
            });
            return;
        }

        const { avatar, name } = user;
        const { value: text } = post;
        const requestData = { avatar, name, text };

        this.setState({
            post: {
                ...post,
                loading: true
            }
        });
        axios
            .post(routes.savePost, requestData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(res => {
                this.setState({
                    post: {
                        ...post,
                        value: '',
                        loading: false
                    }
                });
                this.authService.makeSecureRequest(fetchPosts);
            })
            .catch(err => {
                this.setState({
                    post: {
                        ...post,
                        loading: false,
                        error: true,
                        message: 'Some error occurred while saving'
                    }
                });
            });
    };

    handlePostButtonClick = () => {
        this.authService.makeSecureRequest(this.savePost);
    };

    clearError = () => {
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                error: false,
                message: ''
            }
        });
    };

    renderError = () => {
        const { post } = this.state;
        const { error: postError, message: postErrorMessage } = post;
        const error = postError;
        let message = '';

        if (postError) message = postErrorMessage;

        return <Toast visible={error} color="#CC0000" message={message} onDismiss={this.clearError} />;
    };

    render() {
        const { posts, user } = this.props;
        const { post } = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    <Create
                        user={user}
                        value={post.value}
                        handleInputChange={this.handleInputChange}
                        handlePostButtonClick={this.handlePostButtonClick}
                        loading={post.loading}
                    />
                    <Posts {...posts} user={user} />
                    {this.renderError()}
                </Container>
            </TouchableWithoutFeedback>
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
