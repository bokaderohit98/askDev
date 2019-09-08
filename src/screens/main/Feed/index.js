import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Keyboard, StyleSheet, Dimensions } from 'react-native';
import { Portal, Modal, Subheading, Button } from 'react-native-paper';
import Create from './Create';
import Posts from './Posts';
import { fetchPosts, likePost } from '../../../redux/api';
import AuthService from '../../../utils/authService';
import { Toast } from '../../../components';
import axios from '../../../utils/axios';
import routes from '../../../utils/routes';

const Container = styled.View`
    display: flex;
    flex: 1;
    background: #eeeeee;
`;

const ModalContainer = styled.ScrollView`
    display: flex;
    background-color: #ffffff;
    padding: 16px;
    width: ${Dimensions.get('screen').width - 40};
`;

const styles = StyleSheet.create({
    ModalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
});
class Feed extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            post: {
                value: '',
                loading: false,
                error: false,
                message: ''
            },
            deletePost: {
                data: '',
                loading: false,
                error: false,
                message: ''
            },
            showDeleteModal: false
        };
    }

    componentDidMount() {
        const { fetchPosts } = this.props;
        this.authService.makeSecureRequest(fetchPosts);
    }

    toggleDeleteModal = id => () => {
        const { showDeleteModal, deletePost } = this.state;
        const data = id;

        this.setState({
            showDeleteModal: !showDeleteModal,
            deletePost: {
                ...deletePost,
                data
            }
        });
    };

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
        Keyboard.dismiss();
        this.authService.makeSecureRequest(this.savePost);
    };

    deletePost = jwt => {
        const { deletePost } = this.state;
        const { fetchPosts } = this.props;
        const { data } = deletePost;
        this.setState({
            deletePost: {
                ...deletePost,
                loading: true
            }
        });
        axios
            .delete(routes.deletePost(data), {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(res => {
                this.setState({
                    deletePost: {
                        ...deletePost,
                        loading: false
                    },
                    showDeleteModal: false
                });
                fetchPosts(jwt);
            })
            .catch(err => {
                this.setState({
                    deletePost: {
                        ...deletePost,
                        loading: false,
                        error: true,
                        message: 'Some error occurred'
                    }
                });
            });
    };

    handleDeleteButtonClick = () => {
        const { deletePost } = this.state;
        this.authService.makeSecureRequest(this.deletePost);
    };

    toggleLike = (id, liked) => jwt => {
        const url = liked ? routes.unlikePost(id) : routes.likePost(id);
        axios
            .post(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            .then(res => {})
            .catch(err => {});
    };

    handleLikeButtonClick = (index, id) => () => {
        let { posts, user, likePost } = this.props;
        posts = posts.posts;
        const updatedPosts = [...posts];
        let liked = false;

        const updatedPost = { ...updatedPosts[index] };
        if (updatedPost.likes.some(like => like.user === user.id)) {
            liked = true;
            updatedPost.likes = updatedPost.likes.filter(like => like.user !== user.id);
        } else updatedPost.likes.push({ user: user.id });
        updatedPosts[index] = updatedPost;

        likePost(updatedPosts);
        this.authService.makeSecureRequest(this.toggleLike(id, liked));
    };

    navigateToAuthentication = () => {
        const { navigation } = this.props;
        navigation.replace('Authentication');
    };

    clearError = () => {
        const { post, deletePost } = this.state;
        this.setState({
            post: {
                ...post,
                error: false,
                message: ''
            },
            deletePost: {
                ...deletePost,
                error: false,
                message: ''
            }
        });
    };

    renderDeleteModal = () => {
        const { showDeleteModal, deletePost } = this.state;
        const { loading } = deletePost;

        return (
            <Portal>
                <Modal
                    visible={showDeleteModal || loading}
                    contentContainerStyle={styles.ModalContainer}
                    onDismiss={loading ? () => {} : this.toggleDeleteModal()}
                >
                    <ModalContainer contentContainerStyle={styles.ModalContainer}>
                        <Subheading style={{ marginBottom: 10 }}>
                            {`Are you sure you want to delete this Post? This can't be undone`}
                        </Subheading>
                        <Button mode="outlined" loading={loading} onPress={this.handleDeleteButtonClick}>
                            Delete
                        </Button>
                    </ModalContainer>
                </Modal>
            </Portal>
        );
    };

    renderError = () => {
        const { post, deletePost } = this.state;
        const { error: postError, message: postErrorMessage } = post;
        const { error: deleteError, message: deleteErrorMessage } = deletePost;
        const error = postError || deleteError;
        let message = '';

        if (postError) message = postErrorMessage;
        else if (deleteError) message = deleteErrorMessage;

        return <Toast visible={error} color="#CC0000" message={message} onDismiss={this.clearError} />;
    };

    render() {
        const { posts, user, isAuthenticated } = this.props;
        const { post } = this.state;
        return (
            <Container>
                <Create
                    user={user}
                    value={post.value}
                    handleInputChange={this.handleInputChange}
                    handlePostButtonClick={this.handlePostButtonClick}
                    loading={post.loading}
                    isAuthenticated={isAuthenticated}
                    navigateToAuthentication={this.navigateToAuthentication}
                />
                <Posts
                    {...posts}
                    user={user}
                    handleLikeButtonClick={this.handleLikeButtonClick}
                    toggleDeleteModal={this.toggleDeleteModal}
                    isAuthenticated={isAuthenticated}
                    navigateToAuthentication={this.navigateToAuthentication}
                />
                {this.renderDeleteModal()}
                {this.renderError()}
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
    user: state.user,
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    { fetchPosts, likePost }
)(Feed);
