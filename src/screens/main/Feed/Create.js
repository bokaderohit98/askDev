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
        const { user, loading, value, handleInputChange, handlePostButtonClick } = this.props;
        return (
            <Container>
                <PostContainer>
                    <Avatar.Image source={{ uri: user ? user.avatar : null }} style={{ marginRight: 30 }} />
                    <TextInput
                        disabled={loading}
                        placeholder="Ask Something..."
                        multiline
                        numberOfLines={5}
                        mode="outlined"
                        style={{ height: 100, flex: 1 }}
                        onChangeText={handleInputChange}
                        value={value}
                    />
                </PostContainer>
                <Button mode="outlined" onPress={handlePostButtonClick} loading={loading}>
                    Post
                </Button>
            </Container>
        );
    }
}

export default Create;
