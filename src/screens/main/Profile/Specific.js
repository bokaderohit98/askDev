import React, { Component } from 'react';
import styled from 'styled-components';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-datepicker';
import {
    DataTable,
    Avatar,
    Paragraph,
    FAB,
    Portal,
    Modal,
    TextInput,
    Button,
    Checkbox,
    Subheading,
    Title,
    IconButton
} from 'react-native-paper';
import { Empty, Toast } from '../../../components';
import modalSchema, { types } from './modalSchema';
import routes from '../../../utils/routes';
import axios from '../../../utils/axios';
import AuthService from '../../../utils/authService';
import { setProfile } from '../../../redux/api';

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

const ModalContainer = styled.ScrollView`
    display: flex;
    background-color: #ffffff;
    padding: 16px;
    width: ${Dimensions.get('screen').width - 40};
`;

const ModalItemContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;
`;

const styles = StyleSheet.create({
    RowItem: {
        marginRight: 32
    },
    FAB: {
        backgroundColor: '#6200ea',
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 0
    },
    ModalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    Input: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        marginBottom: 10
    }
});

class Specific extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            profile: {},
            isCurrentUser: false,
            modalOpen: false,
            deleteModalOpen: false,
            modalData: modalSchema,
            deleteData: '',
            modalError: {
                error: false,
                message: ''
            },
            savingInformation: {
                loading: false,
                error: false,
                message: ''
            },
            deletingInformation: {
                loading: false,
                error: false,
                message: ''
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { profile, isCurrentUser } = props;
        return {
            ...state,
            profile,
            isCurrentUser
        };
    }

    toggleModal = (type, id) => () => {
        let { modalOpen, deleteModalOpen, deleteData } = this.state;
        if (type === 'create') modalOpen = !modalOpen;
        else {
            deleteModalOpen = !deleteModalOpen;
            deleteData = id;
        }
        this.setState({
            modalOpen,
            deleteModalOpen,
            deleteData
        });
    };

    formatDate = date => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
    };

    handleInputChange = (field, inputType, subType) => value => {
        const { modalData } = this.state;
        const { type } = this.props;
        let updated = [...modalData[type]];

        updated = updated.map(item => {
            const updatedItem = { ...item };

            if (updatedItem.name === field) {
                if (inputType === types.CHECKBOX) {
                    updatedItem.value = !updatedItem.value;
                    updated[3].dates[1].disabled = updatedItem.value;
                } else if (updatedItem.type === types.DATE) {
                    updatedItem.dates = updatedItem.dates.map(innerItem => {
                        const updatedInnerItem = { ...innerItem };
                        if (updatedInnerItem.name === subType) updatedInnerItem.value = value;
                        return updatedInnerItem;
                    });
                } else updatedItem.value = value;
            }
            return updatedItem;
        });

        const updatedModalData = { ...modalData };
        updatedModalData[type] = updated;

        this.setState({
            modalData: updatedModalData
        });
    };

    validateModal = () => {
        const { modalData } = this.state;
        const { type } = this.props;
        const currentData = modalData[type];
        let res = {};
        const requestData = {};

        for (let i = 0; i < currentData.length; i += 1) {
            const item = currentData[i];
            const { name, value, validation } = item;
            if (name === 'dates') {
                const { value: from } = item.dates[0];
                const { value: to, disabled } = item.dates[1];
                res = validation(from, to, disabled);
                requestData.from = from;
                requestData.to = to;
            } else {
                res = validation(value);
                requestData[name] = value;
            }
            if (res.error) {
                this.setState({
                    modalError: res
                });
                return { valid: false, requestData: {} };
            }
        }
        return { valid: true, requestData };
    };

    saveInformation = jwt => {
        const { type } = this.props;
        const { valid, requestData } = this.validateModal();
        const { savingInformation } = this.state;

        if (!valid) return;

        this.setState({
            savingInformation: {
                ...savingInformation,
                loading: true
            }
        });
        const url = type === 'education' ? routes.saveEducation : routes.saveExperience;
        axios
            .post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(res => {
                const { setProfile } = this.props;
                setProfile(res.data);
                this.setState({
                    savingInformation: {
                        loading: false,
                        error: false,
                        message: ''
                    },
                    modalData: modalSchema,
                    modalOpen: false
                });
            })
            .catch(err => {
                this.setState({
                    savingInformation: {
                        loading: false,
                        error: true,
                        message: 'Some error occurred'
                    }
                });
            });
    };

    deleteInformation = jwt => {
        const { type, setProfile } = this.props;
        const { deleteData } = this.state;

        this.setState({
            deletingInformation: {
                error: false,
                message: '',
                loading: true
            }
        });
        const url = type === 'education' ? routes.deleteEducation : routes.deleteExperience;
        axios
            .delete(url(deleteData), {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(res => {
                const { setProfile } = this.props;
                setProfile(res.data);
                this.setState({
                    deletingInformation: {
                        loading: false,
                        error: false,
                        message: ''
                    },
                    deleteModalOpen: false,
                    deleteData: ''
                });
            })
            .catch(err => {
                this.setState({
                    deletingInformation: {
                        loading: false,
                        error: true,
                        message: 'Some error occurred'
                    }
                });
            });
    };

    clearError = () => {
        this.setState({
            modalError: {
                error: false,
                message: ''
            },
            savingInformation: {
                error: false,
                message: ''
            },
            deletingInformation: {
                error: false,
                message: ''
            }
        });
    };

    handleSaveButtonClick = () => {
        this.authService.makeSecureRequest(this.saveInformation);
    };

    handleDeleteButtonClick = () => {
        this.authService.makeSecureRequest(this.deleteInformation);
    };

    renderAddModal = () => {
        const { type } = this.props;
        const { modalOpen, modalData, savingInformation } = this.state;
        const { loading } = savingInformation;
        const currentModal = modalData[type];

        const modalItems = Object.keys(currentModal).map(key => {
            const currentItem = currentModal[key];
            const { label, value, type, dates, name } = currentItem;

            switch (type) {
                case types.INPUT:
                    return (
                        <TextInput
                            disabled={loading}
                            key={label}
                            placeholder={label}
                            value={value}
                            style={{ ...styles.Input, height: 50 }}
                            onChangeText={this.handleInputChange(name)}
                        />
                    );
                case types.MULTILINE_INPUT:
                    return (
                        <TextInput
                            disabled={loading}
                            key={label}
                            placeholder={label}
                            value={value}
                            numberOfLines={3}
                            style={styles.Input}
                            onChangeText={this.handleInputChange(name)}
                        />
                    );
                case types.DATE: {
                    const date = new Date();
                    const maxDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const datesUI = dates.map((date, index) => (
                        <DateTimePicker
                            disabled={date.disabled || loading}
                            style={{ marginRight: index === 0 ? 24 : 0 }}
                            key={date.label}
                            placeholder={date.label}
                            iconComponent={<Avatar.Icon icon="date-range" size={24} />}
                            customStyles={{
                                dateInput: {
                                    marginRight: 8
                                }
                            }}
                            date={date.value}
                            maxDate={maxDate}
                            onDateChange={this.handleInputChange('dates', type, date.name)}
                        />
                    ));
                    return <ModalItemContainer key={dates}>{datesUI}</ModalItemContainer>;
                }
                case types.CHECKBOX:
                    return (
                        <ModalItemContainer key={label}>
                            <Subheading>{label}</Subheading>
                            <Checkbox
                                disabled={loading}
                                status={value ? 'checked' : 'unchecked'}
                                color="#6200ea"
                                onPress={this.handleInputChange(name, type)}
                            />
                        </ModalItemContainer>
                    );
                default:
                    return null;
            }
        });

        return (
            <Portal>
                <Modal
                    visible={modalOpen}
                    onDismiss={loading ? () => {} : this.toggleModal('create')}
                    contentContainerStyle={styles.ModalContainer}
                >
                    <ModalContainer contentContainerStyle={styles.ModalContainer}>
                        <>
                            <Title>{`ADD ${type.toUpperCase()}`}</Title>
                            {modalItems}
                            <Button mode="outlined" onPress={this.handleSaveButtonClick} loading={loading}>
                                Save
                            </Button>
                        </>
                    </ModalContainer>
                </Modal>
            </Portal>
        );
    };

    renderDeleteModal = () => {
        const { deleteModalOpen, deletingInformation } = this.state;
        const { loading } = deletingInformation;
        const { type } = this.props;
        return (
            <Portal>
                <Modal
                    visible={deleteModalOpen || loading}
                    contentContainerStyle={styles.ModalContainer}
                    onDismiss={loading ? () => {} : this.toggleModal('delete')}
                >
                    <ModalContainer contentContainerStyle={styles.ModalContainer}>
                        <Subheading style={{ marginBottom: 10 }}>
                            {`Are you sure you want to delete this ${
                                type === 'experience' ? 'experience' : 'education'
                            }? This can't' be undone`}
                        </Subheading>
                        <Button mode="outlined" loading={loading} onPress={this.handleDeleteButtonClick}>
                            Delete
                        </Button>
                    </ModalContainer>
                </Modal>
            </Portal>
        );
    };

    renderList = () => {
        const { profile, isCurrentUser } = this.state;
        const { type } = this.props;
        const isEducation = type === 'education';
        const iteratable = isEducation ? profile.education : profile.experience;
        const items = iteratable.map(item => (
            <ItemContainer key={item._id}>
                <DataTable>
                    <TableRow>
                        <Avatar.Icon icon={isEducation ? 'school' : 'work'} style={styles.RowItem} size={24} />
                        <DataTable.Cell>{isEducation ? item.school : item.title}</DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon icon={isEducation ? 'details' : 'business'} style={styles.RowItem} size={24} />
                        <DataTable.Cell>{isEducation ? item.degree : item.company}</DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon icon={isEducation ? 'computer' : 'map'} style={styles.RowItem} size={24} />
                        <DataTable.Cell>{isEducation ? item.fieldofstudy : item.location}</DataTable.Cell>
                    </TableRow>
                    <TableRow>
                        <Avatar.Icon icon="event" style={styles.RowItem} size={24} />
                        <DataTable.Cell>{`${this.formatDate(item.from)} - ${
                            item.current ? 'Today' : this.formatDate(item.to)
                        }`}</DataTable.Cell>
                    </TableRow>
                    {item.description && item.description.length > 0 ? (
                        <View>
                            <Paragraph>{item.description}</Paragraph>
                        </View>
                    ) : null}
                    {isCurrentUser && (
                        <TableRow style={{ justifyContent: 'flex-end' }}>
                            <IconButton
                                icon="delete"
                                style={{ backgroundColor: '#0000' }}
                                size={24}
                                color="#d50000"
                                onPress={this.toggleModal('delete', item._id)}
                            />
                        </TableRow>
                    )}
                </DataTable>
            </ItemContainer>
        ));
        return items;
    };

    renderError = () => {
        const { modalError: modal, savingInformation, deletingInformation } = this.state;
        const { error: savingInformationError, message: savingInformationMessage } = savingInformation;
        const { error: modalError, message: modalErrorMessage } = modal;
        const { error: deleteError, message: deleteMessage } = deletingInformation;
        const error = savingInformationError || modalError || deleteError;
        let message = '';

        if (savingInformationError) message = savingInformationMessage;
        else if (modalError) message = modalErrorMessage;
        else if (deleteError) message = deleteMessage;

        return <Toast visible={error} color="#CC0000" message={message} onDismiss={this.clearError} />;
    };

    render() {
        const { isCurrentUser, deleteData } = this.state;
        const { type, profile } = this.props;
        const { education, experience } = profile;
        return (
            <View style={{ display: 'flex', flex: 1 }}>
                <Container contentContainerStyle={{ flexGrow: 1 }}>
                    {type === 'education' && education.length === 0 && <Empty>No Education Record!</Empty>}
                    {type === 'experience' && experience.length === 0 && <Empty>No experience Record!</Empty>}
                    {(education.length !== 0 || experience.length !== 0) && this.renderList()}
                    {isCurrentUser && this.renderAddModal()}
                    {isCurrentUser && this.renderDeleteModal()}
                    {this.renderError()}
                </Container>
                {isCurrentUser && (
                    <FAB style={styles.FAB} icon="add-circle-outline" onPress={this.toggleModal('create')} />
                )}
            </View>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { setProfile }
)(Specific);
