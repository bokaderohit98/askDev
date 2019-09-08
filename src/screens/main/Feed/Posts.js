import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Avatar, Subheading, IconButton, Button } from 'react-native-paper';

const Container = styled.ScrollView`
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
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {
                    _id: '5d74de90c24db60017fcb904',
                    text: 'How to center an element in a div?\n',
                    name: 'Kim Jong ',
                    avatar: '//www.gravatar.com/avatar/034f593e53f540ad20b56528a3631a64?s=200&r=pg&d=mm',
                    user: '5d6ae6f0b9479000170dd352',
                    likes: [],
                    comments: [],
                    date: '2019-09-08T10:57:20.918Z',
                    __v: 0
                },
                {
                    _id: '5d74de39c24db60017fcb903',
                    text: 'how to deploy a web app on aws for free?\n',
                    name: 'Kim Jong ',
                    avatar: '//www.gravatar.com/avatar/034f593e53f540ad20b56528a3631a64?s=200&r=pg&d=mm',
                    user: '5d6ae6f0b9479000170dd352',
                    likes: [],
                    comments: [],
                    date: '2019-09-08T10:55:53.370Z',
                    __v: 0
                },
                {
                    _id: '5cae3a43f6973100173fac07',
                    text: 'How to add all the missing node packages listed in package.json file ?',
                    name: 'Harsh',
                    avatar: '//www.gravatar.com/avatar/ec773426068ee2d27896f0ddd92cbc5a?s=200&r=pg&d=mm',
                    user: '5cae2facf6973100173fac05',
                    likes: [
                        { _id: '5d2accaf17166500170f8c5c', user: '5d2acc8d17166500170f8c5b' },
                        { _id: '5cae3aa4f6973100173fac0a', user: '5cadd73af93a5c00170b5b30' },
                        { _id: '5cae3a46f6973100173fac08', user: '5cae2facf6973100173fac05' }
                    ],
                    comments: [
                        {
                            date: '2019-09-04T17:42:47.110Z',
                            _id: '5d6ff7978d07e80017959ca9',
                            text:
                                'Go to Himalaya and fetch sanjivani booty from there. Later on apply sanjivani to the laptop all the packages will be installed',
                            name: 'Vegeta',
                            avatar: '//www.gravatar.com/avatar/8cb4f4ea52a1f0078c9af9719381c444?s=200&r=pg&d=mm',
                            user: '5d6d37f71a2d3700170a74c0'
                        },
                        {
                            date: '2019-04-10T18:48:52.778Z',
                            _id: '5cae3a94f6973100173fac09',
                            text:
                                'open terminal in the project directory and run npm install all the packages will be installed.',
                            name: 'Nikhil Gupta',
                            avatar: '//www.gravatar.com/avatar/bd7c16d04392f5b9fc0fabdfd134e451?s=200&r=pg&d=mm',
                            user: '5cadd73af93a5c00170b5b30'
                        }
                    ],
                    date: '2019-04-10T18:47:31.893Z',
                    __v: 15
                }
            ]
        };
    }

    renderPostFooter = post => {
        const { likes, comments } = post;
        const nlikes = likes.length;
        const ncomments = comments.length;
        return (
            <PostFooter>
                <Button color="#777777">Like</Button>
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
        const { posts } = this.state;
        return posts.map(post => {
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
                    {this.renderPostFooter(post)}
                </PostContainer>
            );
        });
    };

    render() {
        return <Container>{this.renderPosts()}</Container>;
    }
}

export default Posts;
