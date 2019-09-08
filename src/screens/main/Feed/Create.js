import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Avatar, TextInput } from 'react-native-paper';

const Container = styled.View`
    margin-bottom: 32px;
    padding: 16px;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
`;

const PostContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    height: 100px;
    margin-bottom: 16px;
`;

class Create extends Component {
    render() {
        return (
            <Container>
                <PostContainer>
                    <Avatar.Image
                        source={{
                            uri:
                                'https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/placeholder-profile_3.png'
                        }}
                        style={{ marginRight: 30 }}
                    />
                    <TextInput
                        placeholder="Ask Something..."
                        multiline
                        numberOfLines={5}
                        mode="outlined"
                        style={{ height: 100, flex: 1 }}
                    />
                </PostContainer>
                <Button mode="outlined">Post</Button>
            </Container>
        );
    }
}

export default Create;
