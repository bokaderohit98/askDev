import React, { Component } from 'react';
import styled from 'styled-components';
import { TextInput, Subheading, Avatar, IconButton, Paragraph, Button, Title } from 'react-native-paper';
import { StyleSheet, Dimensions, View, KeyboardAvoidingView } from 'react-native';

const Container = styled.View`
    display: flex;
    flex: 1;
    background-color: #ffffff;
`;

const CommentsContainer = styled.ScrollView`
    display: flex;
    flex: 1;
    padding: 16px;
`;

const AddCommentContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-top-color: #cccccc;
    border-top-width: 1;
    padding: 16px;
`;

const Comment = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom-color: #cccccc;
    border-bottom-width: 1;
    margin-bottom: 32px;
    padding: 16px;
`;

const CommentMeta = styled.View`
    display: flex;
    align-items: center;
    margin-right: 32px;
    width: 50;
`;

const PostContainer = styled.View`
    padding: 0 16px;
    background-color: #fffff0;
    margin-bottom: 16px;
`;

const PostHeader = styled.View`
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const styles = StyleSheet.create({
    AddComment: {
        display: 'flex',
        height: 55,
        width: Dimensions.get('screen').width - 80,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 50,
        overflow: 'hidden'
    },
    Input: {
        backgroundColor: '#ffffff'
    },
    Close: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
        paddingTop: 40
    },
    Center: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    KeyboardAvoidingView: {
        display: 'flex',
        flex: 1
    }
});

class Comments extends Component {
    renderComments = () => {
        const { comments } = this.props;

        const commentsUI =
            comments &&
            comments.map(comment => {
                const { name, avatar, text, _id } = comment;
                return (
                    <Comment key={_id}>
                        <CommentMeta>
                            <Avatar.Image source={{ uri: avatar }} size={32} />
                            <Paragraph>{name}</Paragraph>
                        </CommentMeta>
                        <View style={{ display: 'flex', flex: 1 }}>
                            <Subheading>{text}</Subheading>
                        </View>
                    </Comment>
                );
            });
        return (
            <>
                {(!comments || comments.length) === 0 && (
                    <View style={styles.Center}>
                        <Subheading>No Comments!</Subheading>
                    </View>
                )}
                {comments.length > 0 && <CommentsContainer>{commentsUI}</CommentsContainer>}
            </>
        );
    };

    renderPost = () => {
        const { post } = this.props;
        const { avatar, name, text } = post;
        return (
            <PostContainer>
                <PostHeader>
                    <View style={{ flex: 1, flexDirection: 'row', width: 60, alignItems: 'center' }}>
                        <Avatar.Image src={{ uri: avatar }} size={54} style={{ marginRight: 16 }} />
                        <Subheading>{name}</Subheading>
                    </View>
                </PostHeader>
                <Title style={{ padding: 16, minHeight: 100 }}>{text}</Title>
            </PostContainer>
        );
    };

    render() {
        const {
            toggleComments,
            isAuthenticated,
            navigateToAuthentication,
            handleCommentButtonClick,
            handleInputChange,
            value,
            loading
        } = this.props;
        return (
            <Container>
                <View style={styles.Close}>
                    <IconButton disabled={loading} icon="close" color="#777777" onPress={toggleComments} />
                </View>
                {this.renderPost()}
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding">
                    {this.renderComments()}
                    <AddCommentContainer>
                        {isAuthenticated && (
                            <Button mode="outlined" onPress={navigateToAuthentication}>
                                Login to Comment
                            </Button>
                        )}
                        {isAuthenticated && (
                            <>
                                {!loading && (
                                    <>
                                        <View style={styles.AddComment}>
                                            <TextInput
                                                disabled={loading}
                                                placeholder="Add a comment.."
                                                style={styles.Input}
                                                value={value}
                                                onChangeText={handleInputChange}
                                            />
                                        </View>
                                        <IconButton
                                            disabled={loading}
                                            icon="send"
                                            size={24}
                                            color="#0000ff"
                                            onPress={handleCommentButtonClick}
                                        />
                                    </>
                                )}
                                {loading && <Button loading={loading} />}
                            </>
                        )}
                    </AddCommentContainer>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default Comments;
