import React, { Component } from 'react';
import styled from 'styled-components';
import Create from './Create';
import Posts from './Posts';

const Container = styled.View`
    display: flex;
    flex: 1;
    background: #eeeeee;
`;

class Feed extends Component {
    render() {
        return (
            <Container>
                <Create />
                <Posts />
            </Container>
        );
    }
}

export default Feed;
