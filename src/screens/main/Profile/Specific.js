import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { DataTable, Avatar, Paragraph } from 'react-native-paper';

const Container = styled.ScrollView`
    display: flex;
    flex: 1;
    padding-top: 32px;
`;

const ItemContainer = styled.View`
    display: flex;
    background-color: #ffffff;
    padding: 16px;
    margin-bottom: 20px;
    border-bottom-color: #cccccc;
    border-bottom-width: 1;
`;

const TableRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
`;

const DescriptionConainer = styled.View``;

const styles = StyleSheet.create({
    RowItem: {
        marginRight: 32
    }
});

class Specific extends Component {
    formatDate = date => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
    };

    renderList = () => {
        const { profile, type } = this.props;
        const isEducation = type === 'education';
        const iteratable = isEducation ? profile.education : profile.experience;
        const items = iteratable.map(item => (
            <ItemContainer key={item._id}>
                <DataTable>
                    <TableRow>
                        <Avatar.Icon
                            icon={isEducation ? 'school' : 'work'}
                            style={styles.RowItem}
                            size={24}
                        />
                        <DataTable.Cell>
                            {isEducation ? item.school : item.title}
                        </DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon
                            icon={isEducation ? 'details' : 'business'}
                            style={styles.RowItem}
                            size={24}
                        />
                        <DataTable.Cell>
                            {isEducation ? item.degree : item.company}
                        </DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon
                            icon={isEducation ? 'computer' : 'map'}
                            style={styles.RowItem}
                            size={24}
                        />
                        <DataTable.Cell>
                            {isEducation ? item.fieldofstudy : item.location}
                        </DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon
                            icon="event"
                            style={styles.RowItem}
                            size={24}
                        />
                        <DataTable.Cell>{`${this.formatDate(item.from)} - ${
                            item.current ? 'Today' : this.formatDate(item.to)
                        }`}</DataTable.Cell>
                    </TableRow>
                    {item.description && item.description.length > 0 && (
                        <DescriptionConainer>
                            <Paragraph>{item.description}</Paragraph>
                        </DescriptionConainer>
                    )}
                </DataTable>
            </ItemContainer>
        ));
        return items;
    };

    render() {
        return <Container>{this.renderList()}</Container>;
    }
}

export default Specific;
