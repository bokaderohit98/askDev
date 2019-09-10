import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, TextInput } from 'react-native-paper';

const Container = styled.View`
    margin-bottom: 32px;
    padding: 16px;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
    min-height: 100px;
    padding-top: 80px;
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
        const {
            loading,
            value,
            isAuthenticated,
            handleInputChange,
            handlePostButtonClick,
            navigateToAuthentication
        } = this.props;
        return (
            <Container>
                {isAuthenticated && (
                    <>
                        <PostContainer>
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
                    </>
                )}
                {!isAuthenticated && (
                    <Button mode="outlined" onPress={navigateToAuthentication}>
                        Login to Post
                    </Button>
                )}
            </Container>
        );
    }
}

export default Create;
