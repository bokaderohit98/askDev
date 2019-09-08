import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Avatar, Subheading, IconButton, Button } from 'react-native-paper';
import { Loading, Error, Empty } from '../../../components';

const Container = styled.ScrollView`
    display: flex;
    flex: 1;
`;

const UtilContainer = styled.View`
    background-color: #ffffff;
    display: flex;
    flex: 1;
`;

const PostContainer = styled.View`
    padding: 0 16px;
    background-color: #ffffff;
    border-bottom-color: #000000;
    margin-bottom: 16px;
`;

const PostHeader = styled.View`
    display: flex;
    padding: 4px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 1;
    border-bottom-color: #cccccc;
`;

const PostFooter = styled.View`
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top-width: 1;
    border-top-color: #cccccc;
`;

class Posts extends Component {
    renderPostFooter = (index, post, user) => {
        const { handleLikeButtonClick } = this.props;
        const { likes, comments } = post;
        const nlikes = likes.length;
        const ncomments = comments.length;
        const liked = likes.some(like => like.user === user.id);
        return (
            <PostFooter>
                <Button color={liked ? '#0000ff' : '#777777'} onPress={handleLikeButtonClick(index, post._id)}>
                    Like
                </Button>
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <View>{nlikes > 0 && <Subheading style={{ color: '#777777' }}>{nlikes}</Subheading>}</View>
                    <View>{ncomments > 0 && <Subheading style={{ color: '#777777' }}>{ncomments}</Subheading>}</View>
                </View>
                <Button color="#777777">Comment</Button>
            </PostFooter>
        );
    };

    renderPosts = () => {
        const { posts, user } = this.props;
        return posts.map((post, index) => {
            const { _id, avatar, name, text } = post;
            return (
                <PostContainer key={_id}>
                    <PostHeader>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Avatar.Image src={{ uri: avatar }} size={32} style={{ marginRight: 16 }} />
                            <Subheading>{name}</Subheading>
                        </View>
                        <IconButton icon="more-vert" size={24} color="#777777" />
                    </PostHeader>
                    <Subheading style={{ padding: 16, minHeight: 100 }}>{text}</Subheading>
                    {this.renderPostFooter(index, post, user)}
                </PostContainer>
            );
        });
    };

    render() {
        const { loading, error, posts } = this.props;
        return (
            <>
                {loading && (
                    <UtilContainer>
                        <Loading />
                    </UtilContainer>
                )}
                {!loading && error && (
                    <UtilContainer>
                        <Error />
                    </UtilContainer>
                )}
                {!loading && !error && (!posts || posts.length === 0) && (
                    <UtilContainer>
                        <Empty>No posts found!</Empty>
                    </UtilContainer>
                )}
                {!loading && !error && posts && posts.length > 0 && <Container>{this.renderPosts()}</Container>}
            </>
        );
    }
}

export default Posts;
