import React, { Component } from 'react';
import styled from 'styled-components';
import { TextInput, Subheading, Avatar, IconButton, Paragraph, Button } from 'react-native-paper';
import { StyleSheet, Dimensions, View } from 'react-native';

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
        padding: 16
    },
    Center: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
                        <Subheading>{text}</Subheading>
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

    render() {
        const { toggleComments, isAuthenticated, navigateToAuthentication } = this.props;
        return (
            <Container>
                <View style={styles.Close}>
                    <IconButton icon="close" color="#777777" onPress={toggleComments} />
                </View>
                {this.renderComments()}
                <AddCommentContainer>
                    {!isAuthenticated && (
                        <Button mode="outlined" onPress={navigateToAuthentication}>
                            Login to Comment
                        </Button>
                    )}
                    {isAuthenticated && (
                        <>
                            <View style={styles.AddComment}>
                                <TextInput palceholder="Add a comment.." style={styles.Input} />
                            </View>
                            <IconButton icon="send" size={24} color="#0000ff" />
                        </>
                    )}
                </AddCommentContainer>
            </Container>
        );
    }
}

export default Comments;
